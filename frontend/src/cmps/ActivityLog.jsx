import { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Avatar } from '@material-ui/core';
import { utilService } from '../services/util.service'
import { AccessTime } from '@material-ui/icons';

class _ActivityLog extends Component {
    render() {
        const { board } = this.props
        return (
            <section className="activity-log flex column gap">
                <h1 className="activity-header flex grow gap"><span>{board?.title}</span>Log</h1>
                <div className="activity-container flex  column gap">
                    {board?.activities.map(activity => (
                        <div key={activity.id} className="activity-item flex align-center space-between gap">
                            <div className="activity-item-content flex gap align-center">

                                <Badge
                                    overlap="circular"
                                    variant="dot">
                                    <Avatar
                                        style={{ width: 30, height: 30 }}
                                        alt={activity.byMember.fullname.slice(0, 1)}
                                        src={activity.byMember?.imgUrl}>
                                        {activity.byMember.fullname.slice(0, 1).toUpperCase()}
                                    </Avatar>
                                </Badge>
                                <span>{activity.info}</span>
                            </div>

                            <div 
                            style={{
                                gap:'3px'
                            }}
                            className="time-added flex align-center">
                                <AccessTime style={{ color: 'lightgray', width: 17 }} />
                                <span>{utilService.timeSince(activity.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        board: state.boardModule.board,
    };
}

export const ActivityLog = connect(mapStateToProps)(_ActivityLog);

