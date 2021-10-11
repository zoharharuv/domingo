import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
import { boardUtils } from './board-utils'
import { userService } from './user.service';
import { utilService } from './util.service';
import { socketService } from './socket.service'

export const boardService = {
    getBoards,
    getById,
    update,
    add,
    remove,
    editBoard,
    addUserToBoard,
    removeUserFromBoard,
    // 
    reorderGroups,
    addGroup,
    removeGroup,
    editGroup,
    // 
    addTask,
    removeTask,
    editTask,
    addComment,
    changeStatus,
    changePriority,
    addStatus,
    addPriority,
    removeStatusPriority,
    reorderTasks,
    switchTasks,
    reorderStatusPriority,
    updateStatusPriority,
    addMemberToTask,
    removeMemberFromTask
}

window.boardService = boardService


//BOARD CRUD
async function getBoards(filterBy) {
    try {
        const filter = { ...filterBy }
        return await httpService.get('board', filter)
    } catch (err) {
        console.log(err);
    }
}

async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
}

function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function add(boardId = null) {
    let board
    if (boardId) {
        board = await getById(boardId)
        delete board._id
        board.title = board.title + ' copy'
    } else {
        board = boardUtils.getEmptyBoard()
    }
    board = await _addActivity(board, board.title, 'created ')
    return await httpService.post('board', board)
}

async function update(board) {
    const updatedBoard = await httpService.put(`board/${board._id}`, board)
    socketService.emit('board changed', updatedBoard)
    return updatedBoard
}

async function editBoard(boardId, updatedField) {
    const field = Object.keys(updatedField)[0]
    let board = await getById(boardId)
    board[field] = Object.values(updatedField)[0]
    board = await _addActivity(board, board?.title, 'updated board: ')
    return await update(board)
}


// BOARD USER FUNCS
async function addUserToBoard(boardId, user) {
    let board = await getById(boardId)
    const isExist = board.members.some(member => member._id === user._id)
    if (!isExist) {
        board.members.push(user)
    }
    board = await _addActivity(board, 'user', 'added ')
    return await update(board)
}

async function removeUserFromBoard(boardId, userId) {
    let board = await getById(boardId)
    board.members = board.members.filter(member => member._id !== userId)
    board = await _addActivity(board, 'user', 'removed ')
    return await update(board)
}


//GROUP CRUD
async function reorderGroups(board) {
    // let board = await getById(boardId)
    // board.groups = groupList
    board = await _addActivity(board, 'group', 'repositioned ')
    return await update(board)
}

async function addGroup(boardId, groupId = null) {
    let board = await getById(boardId)
    var group
    if (!groupId) {
        // NEW GROUP
        group = boardUtils.getEmptyGroup()
        board.groups.unshift(group)
    } else {
        // GROUP DUPLICATE
        group = board.groups.find(group => group.id === groupId)
        const newGroup = { ...group }
        const id = utilService.makeId(6);
        newGroup.id = id;
        newGroup.title = newGroup.title + ' copy';
        board.groups.push(newGroup)
    }
    board = await _addActivity(board, group.title, 'added group: ')
    return await update(board)
}

async function removeGroup(boardId, groupId) {
    let board = await getById(boardId)
    board.groups = board.groups.filter(group => group.id !== groupId)
    board = await _addActivity(board, groupId, 'removed group by id: ')
    return await update(board)
}

async function editGroup(boardId, groupId, updatedField) {
    const field = Object.keys(updatedField)[0]
    let board = await getById(boardId)
    const idx = board.groups.findIndex(group => group.id === groupId)
    if (field === 'bgColor') {
        board.groups[idx].style.bgColor = Object.values(updatedField)[0]
    }
    else {
        board.groups[idx][field] = Object.values(updatedField)[0]
    }
    board = await _addActivity(board, board.groups[idx]?.title, 'updated group: ')
    return await update(board)
}


//TASK CRUD
async function addTask(boardId, groupId, taskId = null, title) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    var task
    if (!taskId) {
        if (title) {
            task = boardUtils.getEmptyTask()
            task.title = title
        } else
            task = boardUtils.getEmptyTask()
    } else {
        const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
        const newTask = board.groups[gIdx].tasks[tIdx]
        task = { ...newTask }
        task.id = utilService.makeId()
    }
    board.groups[gIdx].tasks.push(task)
    board = await _addActivity(board, task.title, 'added task: ')
    return await update(board)
}

async function removeTask(boardId, groupId, taskId) {
    let board = await getById(boardId)
    const idx = board.groups.findIndex(group => group.id === groupId)
    board.groups[idx].tasks = board.groups[idx].tasks.filter(task => task.id !== taskId)
    board = await _addActivity(board, taskId, 'removed task by id: ')
    return await update(board)
}

async function editTask(boardId, groupId, taskId, updatedField) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
    board.groups[gIdx].tasks[tIdx][Object.keys(updatedField)[0]] = Object.values(updatedField)[0]
    const task = board.groups[gIdx].tasks[tIdx]
    board = await _addActivity(board, task?.title, 'updated task: ')
    return await update(board)
}

async function addComment(boardId, groupId, taskId, comment) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
    comment.id = utilService.makeId()
    board.groups[gIdx].tasks[tIdx].comments.unshift(comment)
    board = await _addActivity(board, 'comment', 'added ')
    return await update(board)
}

async function changeStatus(boardId, groupId, taskId, status) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
    board.groups[gIdx].tasks[tIdx].status = status
    board = await _addActivity(board, 'status', 'updated ')
    return await update(board)
}

async function changePriority(boardId, groupId, taskId, priority) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
    board.groups[gIdx].tasks[tIdx].priority = priority
    board = await _addActivity(board, 'priority', 'updated ')
    return await update(board)
}

async function addStatus(boardId, status) {
    let board = await getById(boardId)
    status.id = utilService.makeId()
    status.title = status.title || '\xa0'
    board.statuses.push(status)
    board = await _addActivity(board, 'status', 'added ')
    return await update(board)
}

async function addPriority(boardId, priority) {
    let board = await getById(boardId)
    priority.id = utilService.makeId()
    priority.title = priority.title || '\xa0'
    board.priorities.push(priority)
    board = await _addActivity(board, 'priority', 'added ')
    return await update(board)
}

async function removeStatusPriority(boardId, type, entityId) {
    let board = await getById(boardId)
    if (type === 'status') {
        board.statuses = board.statuses.filter(status => status.id !== entityId)
    } else {
        board.priorities = board.priorities.filter(priority => priority.id !== entityId)
    }
    board = await _addActivity(board, 'status/priority', 'removed ')
    return await update(board)
}

async function reorderTasks(board) {
    board = await _addActivity(board, 'task', 'repositioned ')
    return await update(board)
}

async function switchTasks(board) {
    board = await _addActivity(board, 'task', 'repositioned ')
    return await update(board)
}

async function reorderStatusPriority(board) {
    board = await _addActivity(board, 'status/priority', 'repositioned ')
    return await update(board)
}

async function updateStatusPriority(boardId, type, updatedEntity) {
    let board = await getById(boardId)
    if (type === 'status') {
        const sIdx = board.statuses.findIndex(status => status.id === updatedEntity.id)
        board.statuses[sIdx] = updatedEntity
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.status.id === updatedEntity.id)
                    task.status = updatedEntity
            })
        })
    } else {
        const pIdx = board.priorities.findIndex(priority => priority.id === updatedEntity.id)
        board.priorities[pIdx] = updatedEntity
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.priority.id === updatedEntity.id)
                    task.priority = updatedEntity
            })
        })
    }
    board = await _addActivity(board, 'status/priority', 'updated ')
    return await update(board)
}

// TASK MEMBER FUNCS
async function addMemberToTask(boardId, groupId, taskId, member) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
    const isExist = board.groups[gIdx].tasks[tIdx].members.some(taskMember => taskMember._id === member._id)
    if (!isExist) {
        const newMember = { ...member }
        delete newMember.mentions
        delete newMember.username
        board.groups[gIdx].tasks[tIdx].members.push(newMember)
    }
    board = await _addActivity(board, `task: ${board.groups[gIdx].tasks[tIdx].title}`, `added ${member.fullname} to `)
    return await update(board)
}

async function removeMemberFromTask(boardId, groupId, taskId, memberId) {
    let board = await getById(boardId)
    const gIdx = board.groups.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx].tasks.findIndex(task => task.id === taskId)
    const memberIdx = board.groups[gIdx].tasks[tIdx].members.findIndex(member => member._id === memberId)
    const removedMember = board.groups[gIdx].tasks[tIdx].members.splice(memberIdx, 1)[0]
    board = await _addActivity(board, `task: ${board.groups[gIdx].tasks[tIdx].title}`, `removed ${removedMember.fullname} from task `)
    return await update(board)
}

// ACTIVITES FUNCS
async function _addActivity(board, type, action) {
    const user = userService.getLoggedinUser()
    delete user.password
    delete user.username
    delete user.mentions
    const newActivity = {
        id: utilService.makeId(),
        info: `${user.fullname} ${action} ${type}`,
        createdAt: Date.now(),
        byMember: user
    }
    if (board.activities.length > 40) board.activities = []
    board.activities.unshift(newActivity)
    socketService.emit('notification', [board._id, newActivity])
    return board
}
