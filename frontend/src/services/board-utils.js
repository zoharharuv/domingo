import { utilService } from './util.service';
import { userService } from './user.service';

export const boardUtils = {
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
}

function getEmptyBoard() {
    const user = userService.getLoggedinUser()

    const createdBy = {
        '_id': user?._id || 'g69',
        'fullname': user?.fullname || 'guest',
        'imgUrl': user?.imgUrl || ''
    };

    return {
        title: 'New board ' + utilService.makeId(1),
        createdAt: Date.now(),
        createdBy,
        members: [
            createdBy
        ],
        statuses: [
            {
                'id': 's169',
                'title': '\xa0',
                'color': '#C4C4C4'
            },
            {
                'id': 's269',
                'title': 'Working',
                'color': '#fdab3d'
            },
            {
                'id': 's369',
                'title': 'Done',
                'color': '#00c875'
            },
            {
                'id': 's469',
                'title': 'Stuck',
                'color': '#e2445c'
            }
        ],
        priorities: [
            {
                id: 'p153',
                title: '\xa0',
                color: '#C4C4C4'
            },
            {
                id: 'p253',
                title: 'Low',
                color: '#00c875'
            },
            {
                id: 'p353',
                title: 'Medium',
                color: '#fdab3d'
            },
            {
                id: 'p453',
                title: 'High',
                color: '#e2445c'
            }
        ],
        labels: [],
        groups: [getEmptyGroup(user)],
        activities: [],
        cmpsOrder: [
            'status-picker',
            'member-picker',
            'date-picker'
        ]
    }
}

function getEmptyGroup(user = null) {
    return {
        id: utilService.makeId(),
        title: 'New group',
        style: {
            'bgColor': '#c4c4c4'
        },
        tasks: [getEmptyTask(user), getEmptyTask(user)]
    }
}

function getEmptyTask(loggedUser = null) {
    const user = loggedUser || userService.getLoggedinUser()
    const byMember = {
        '_id': user?._id || 'g69',
        'fullname': user?.fullname || 'guest',
        'imgUrl': user?.imgUrl || ''
    };
    return {
        id: utilService.makeId(),
        title: 'Text title',
        createdAt: Date.now(),
        members: [],
        dueDate: '',
        byMember,
        status: {
            id: 's169',
            title: '\xa0',
            color: '#C4C4C4'
        },
        priority: {
            id: 'p153',
            title: '\xa0',
            color: '#C4C4C4'
        },
        labelIds: [],
        comments: []
    }
}

