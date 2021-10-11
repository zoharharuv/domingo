import { boardService } from './../../services/board.service';
import { showSuccessMsg, showErrorMsg } from './../../services/event-bus.service';

//BOARD ACTIONS
export function updateBoard(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in update board', err)
        }
    }
}

export function loadBoards(filterBy = null) {
    return async dispatch => {
        try {
            const boards = await boardService.getBoards(filterBy);
            if (!boards.length) {
                // -----------------NOT WORKING WITH FILTER!---------------
                // const board = await boardService.add()
                // boards.push(board);
            }
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('boardActions: err in loadBoards', err)
        }
    }
}

export function loadBoard(boardId, filterBy = null) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_LOADER' })
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
            return board
        } catch (err) {
            console.log('boardActions: err in loadBoard', err)
        } finally {
            dispatch({ type: 'SET_LOADER' })
        }
    }
}

export function addBoard(boardId = null) {
    return async dispatch => {
        try {
            const board = await boardService.add(boardId)
            dispatch({ type: 'ADD_BOARD', board })
            showSuccessMsg('Added board')
            return board
        } catch (err) {
            showErrorMsg('Cannot add board')
            console.log('boardActions: err in addBoard', err)
        }
    }
}

export function editBoard(boardId, updatedField) {
    return async dispatch => {
        try {
            const board = await boardService.editBoard(boardId, updatedField)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in editBoard', err)
        }
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
            showSuccessMsg('Removed board')
        } catch (err) {
            showErrorMsg('Cannot remove board')
            console.log('boardActions: err in editBoard', err)
        }
    }
}

// BOARD USER ACTIONS
export function addUserToBoard(boardId, user) {
    return async dispatch => {
        try {
            const board = await boardService.addUserToBoard(boardId, user)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in addUserToBoard', err)
        }
    }
}

export function removeUserFromBoard(boardId, userId) {
    return async dispatch => {
        try {
            const board = await boardService.removeUserFromBoard(boardId, userId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in removeUserFromBoard', err)
        }
    }
}


//GROUP ACTIONS
export function filter(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'FILTER_BOARD', board })
            // await boardService.reorderGroups(board)
        } catch (err) {
            console.log('boardActions: err in reorder groups', err)
        }
    }
}

export function reorderGroups(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
            await boardService.reorderGroups(board)
        } catch (err) {
            console.log('boardActions: err in reorder groups', err)
        }
    }
}

export function addGroup(boardId, groupId = null) {
    return async dispatch => {
        try {
            const board = await boardService.addGroup(boardId, groupId)
            dispatch({ type: 'SET_BOARD', board })
            showSuccessMsg('Added group')
        } catch (err) {
            showErrorMsg('Cannot add group')
            console.log('boardActions: err in addGroup', err)
        }
    }
}

export function removeGroup(boardId, groupId) {
    return async dispatch => {
        try {
            const board = await boardService.removeGroup(boardId, groupId)
            dispatch({ type: 'SET_BOARD', board })
            showSuccessMsg('Removed group')
        } catch (err) {
            showErrorMsg('Cannot remove group')
            console.log('boardActions: err in removeGroup', err)
        }
    }
}

export function editGroup(boardId, groupId, updatedField) {
    return async dispatch => {
        try {
            const board = await boardService.editGroup(boardId, groupId, updatedField)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in editGroup', err)
        }
    }
}

//TASK ACTIONS
export function addTask(boardId, groupId, taskId = null, title) {
    return async dispatch => {
        try {
            const board = await boardService.addTask(boardId, groupId, taskId, title)
            dispatch({ type: 'SET_BOARD', board })
            showSuccessMsg('Added task')
        } catch (err) {
            showErrorMsg('Cannot add task')
            console.log('boardActions: err in addTask', err)
        }
    }
}

export function removeTask(boardId, groupId, taskId) {
    return async dispatch => {
        try {
            const board = await boardService.removeTask(boardId, groupId, taskId)
            dispatch({ type: 'SET_BOARD', board })
            showSuccessMsg('Removed task')
        } catch (err) {
            showErrorMsg('Cannot remove task')
            console.log('boardActions: err in removeTask', err)
        }
    }
}

export function editTask(boardId, groupId, taskId, updatedField) {
    return async dispatch => {
        try {
            const board = await boardService.editTask(boardId, groupId, taskId, updatedField)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in editTask', err)
        }
    }
}

export function addComment(boardId, groupId, taskId, comment) {
    return async dispatch => {
        try {
            const board = await boardService.addComment(boardId, groupId, taskId, comment)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in add comment', err)
        }
    }
}

export function changeStatus(boardId, groupId, taskId, status) {
    return async dispatch => {
        try {
            const board = await boardService.changeStatus(boardId, groupId, taskId, status)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in change status', err)
        }
    }
}

export function changePriority(boardId, groupId, taskId, priority) {
    return async dispatch => {
        try {
            const board = await boardService.changePriority(boardId, groupId, taskId, priority)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in change priority', err)
        }
    }
}

export function addStatus(boardId, status) {
    return async dispatch => {
        try {
            const board = await boardService.addStatus(boardId, status)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in add status', err)
        }
    }
}

export function addPriority(boardId, priority) {
    return async dispatch => {
        try {
            const board = await boardService.addPriority(boardId, priority)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in add priority', err)
        }
    }
}

export function removeStatusPriority(boardId, type, entityId) {
    return async dispatch => {
        try {
            const board = await boardService.removeStatusPriority(boardId, type, entityId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in remove status or priority', err)
        }
    }
}

export function reorderTasks(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
            await boardService.reorderTasks(board)
        } catch (err) {
            console.log('boardActions: err in reorder tasks', err)
        }
    }
}

export function switchTasks(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
            await boardService.switchTasks(board)
        } catch (err) {
            console.log('boardActions: err in reorder tasks', err)
        }
    }
}

export function reorderStatusPriority(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
           await boardService.reorderStatusPriority(board)
        } catch (err) {
            console.log('boardActions: err in reorder statuses or priorities', err)
        }
    }
}

export function updateStatusPriority(boardId, type, updatedEntity) {
    return async dispatch => {
        try {
            const board = await boardService.updateStatusPriority(boardId, type, updatedEntity)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in update status or priority', err)
        }
    }
}

// TASK USER ACTIONS
export function addMemberToTask(boardId, groupId, taskId, member) {
    return async dispatch => {
        try {
            const board = await boardService.addMemberToTask(boardId, groupId, taskId, member)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in addMemberToTask', err)
        }
    }
}

export function removeMemberFromTask(boardId, groupId, taskId, memberId) {
    return async dispatch => {
        try {
            const board = await boardService.removeMemberFromTask(boardId, groupId, taskId, memberId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardActions: err in removeMemberFromTask', err)
        }
    }
}




