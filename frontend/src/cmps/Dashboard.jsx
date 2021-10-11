import { Bar, Doughnut, HorizontalBar, Pie } from 'react-chartjs-2';
import { Grow } from '@material-ui/core';
import {
    AccountCircleRounded, NotificationsActiveOutlined,
    GroupSharp, FormatListBulletedOutlined
} from '@material-ui/icons';


function BarChart({ board }) {

    function getTaskPerStatus() {
        const groups = board.groups
        let colors = []
        var statusCounter = {}
        groups.forEach(group => {
            // TO REDUCE
            group.tasks.forEach(task => {
                const { title, color } = task.status
                statusCounter[title] = (statusCounter[title] ?? 0) + 1
                if (!colors.includes(color)) colors.push(color)
            });
        })

        return [statusCounter, colors]
    }

    const statusCounter = getTaskPerStatus()
    const boardLabels = Object.keys(statusCounter[0])
    const boardData = Object.values(statusCounter[0])
    let colors = statusCounter[1]

    const data = {
        labels: boardLabels,
        datasets: [
            {
                label: 'Tasks With Status',
                data: [...boardData],
                backgroundColor: colors,
                borderColor: 'lightgrey',
                borderWidth: 1,
            },

        ],
    };

    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontSize: 14,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fixedStepSize: 1

                }
            }]
        },
        aspectRatio: 1,
        // responsive: false,
        maintainAspectRatio: false

    }
    //style={{ width: '500px' }}
    return <Bar data={data} options={options} height={null} width={null} />
}

function BarChartMember({ board }) {

    const { groups } = board
    const memberCounter = {}


    function getTasksPerMember() {
        groups.forEach(group => (
            group.tasks.forEach(task => (
                task.members.forEach(member => (
                    memberCounter[member.fullname] = (memberCounter[member.fullname] ?? 0) + 1
                ))
            ))
        ))
        return memberCounter
    }

    //getting a members map
    const membersMap = getTasksPerMember()
    let members = []
    //converting the map to a members array
    for (const [key, value] of Object.entries(membersMap)) {
        members.push({ key, value })
    }

    //sorting the array by member task count
    members = members.sort((member1, member2) => member1.value - member2.value)

    //converting the array to object
    var sortedObj = members.reduce((result, item) => {
        const { key, value } = item
        result[key] = value
        // get the list of names for that value
        return result;
    }, {});


    const boardLabels = Object.keys(sortedObj)
    const boardData = Object.values(sortedObj)
    const data = {
        type: 'horizontalBar',
        labels: [...boardLabels],
        datasets: [
            {
                label: 'Team Task',
                data: [...boardData],
                backgroundColor: Array(boardData.length).fill('#73C2FB'),

                borderColor: 'lightgrey',
                borderWidth: 1,
            },

        ],


    };


    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    zeroLineColor: 'white',
                    color: 'transparent'
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 17,
                    fixedStepSize: 1

                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    zeroLineColor: 'white',
                    color: 'transparent'
                },
                ticks: {
                    fontSize: 14
                },
            }]
        },
        showAllTooltips: true,
        aspectRatio: 1,
        maintainAspectRatio: true


    }

    //style={{ width: '300px', height: '300px' }} 
    return <HorizontalBar data={data} options={options} height={null} width={null} />
}

function CircularOverallProgress({ board, boardTasksCount, doneTaskCount }) {

    const doneTasks = board.groups.map(group =>
        group.tasks.filter(task => task.status.title === 'Done').length
    ).reduce((acc, length) => acc + length, 0)

    const data = {
        labels: ['Tasks done', 'Remaining'],
        datasets: [
            {
                data: [doneTasks, boardTasksCount - doneTasks],
                backgroundColor: ['#00c875', 'whitesmoke'],
                borderColor: 'lightgrey',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        legend: {
            display: false
        },
        aspectRatio: 1,
        // responsive: true,
        maintainAspectRatio: false
    }
    //style={{ width: '300px', height: '300px' }}

    return <Doughnut data={data} options={options} height={null} width={null} />
}

function PriorityPie({ board }) {

    function getTaskPerPriority() {
        const { groups } = board
        let colors = []
        var statusCounter = {}
        groups.forEach(group => {
            // TO REDUCE
            group.tasks.forEach(task => {
                const { title, color } = task.priority
                statusCounter[title] = (statusCounter[title] ?? 0) + 1
                if (!colors.includes(color)) colors.push(color)
            });
        })

        return [statusCounter, colors]
    }

    const statusCounter = getTaskPerPriority()
    const boardLabels = Object.keys(statusCounter[0])
    const boardData = Object.values(statusCounter[0])
    let colors = statusCounter[1]

    const data = {
        labels: boardLabels,
        datasets: [
            {
                label: 'Tasks With Status',
                data: [...boardData],
                backgroundColor: colors,
                borderColor: 'lightgrey',
                borderWidth: 1,
            },

        ],
    };


    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scale: {
            ticks: {
                precision: 0
            },
        },
        aspectRatio: 1,
    }

    //style={{ width: '300px', height: '300px' }}
    return <Pie data={data} options={options} height={null} width={null} />
}


export function Dashboard({ board }) {

    const getBoardTasksCount = (groups) => {
        return groups.map(group => group.tasks.length).reduce((acc, length) => acc + length, 0)
    }

    const getDoneTasks = (groups) => {
        return groups.map(group =>
            group.tasks.filter(task => task.status.title === 'Done').length
        ).reduce((acc, length) => acc + length, 0)
    }


    const boardTasksCount = getBoardTasksCount(board.groups)
    const doneTaskCount = getDoneTasks(board.groups)

    return (
        <section className="dashboard-container ">
            <div className="dashboard-header flex space-between">
                <Grow in={true}>
                    <div className="card-members header gap flex align-center">
                        <AccountCircleRounded color={'disabled'} />
                        <div className="flex column align-start">
                            <span className="card-counter">{board.members.length}</span>
                            <span className="card-title">Members</span>
                        </div>
                    </div>
                </Grow>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 700 } : {})}
                >
                    <div className="card-groups header gap  flex align-center">
                        <GroupSharp fontSize={'large'} color={'disabled'} className="round-svg" />
                        <div className="flex column align-start">
                            <span className="card-counter">{board.groups.length}</span>
                            <span className="card-title">Groups</span>
                        </div>
                    </div>
                </Grow>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 1400 } : {})}
                >
                    <div className="card-activities header gap flex align-center">
                        <NotificationsActiveOutlined fontSize={'large'} color={'disabled'} className="round-svg" />
                        <div className="flex column align-start">
                            <span className="card-counter">{board.activities.length}</span>
                            <span className="card-title">Activities</span>
                        </div>
                    </div>
                </Grow>
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 2100 } : {})}
                >
                    <div className="card-task header gap flex align-center">
                        <FormatListBulletedOutlined fontSize={'large'} color={'disabled'} className="round-svg" />
                        <div className="flex column align-start">
                            <span className="card-counter">{boardTasksCount}</span>
                            <span className="card-title">Tasks</span>
                        </div>
                    </div>
                </Grow>
            </div>

            <div className="dashboard-priority   relative chart">
                <span className="dashboard-title">Tasks by priority</span>
                <PriorityPie board={board} />
            </div>

            <div className="dashboard-member relative chart ">
                <span className="dashboard-title">Task per member</span>
                <BarChartMember board={board} />
            </div>

            <div className="dashboard-circular relative chart ">
                <span className="dashboard-title">Project progress</span>
                <span className="count-title">{((doneTaskCount / boardTasksCount) * 100).toFixed(0) + '%'}</span>
                <CircularOverallProgress board={board} doneTaskCount={doneTaskCount} boardTasksCount={boardTasksCount} />
            </div>

            <div className="dashboard-task relative chart">
                <span className="dashboard-title">Task distribution</span>
                <BarChart board={board} />
            </div>



        </section>
    )
}

