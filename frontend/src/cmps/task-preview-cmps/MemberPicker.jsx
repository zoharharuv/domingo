import { Component } from "react";
import {
    Avatar,
    Tooltip,
    MenuItem,
    Menu,
    Button,
    Divider
} from "@material-ui/core";
import { AvatarGroup } from '@material-ui/lab';
import { AddCircle } from "@material-ui/icons";
import emptymember from '../../assets/imgs/svg/empty-member.svg'

export class MemberPicker extends Component {
    state = {
        anchorEl: null
    }
    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { board, task, groupId, funcs } = this.props
        const { anchorEl } = this.state
        const isOpen = Boolean(anchorEl);

        return (
            <section className="member-picker flex center-center">
                <Button
                    className={`more-info center-center more-info-btn ${isOpen ? "open" : "close"}`}
                    id="open-menu-btn"
                    aria-controls="members-menu"
                    aria-haspopup="true"
                    aria-expanded={isOpen ? "true" : undefined}
                    onClick={this.handleClick}
                    style={{ padding: 0, width: "100%", }}>


                    <span className="add-members flex center-center">
                        <AddCircle />
                    </span>

                    {task.members?.length > 0 ?
                        <AvatarGroup spacing={5} max={2}>
                            {task.members.map((member, idx) => (
                                <Tooltip
                                    key={member._id}
                                    arrow
                                    title={<h2 className="header-tool-tip">{member.fullname}</h2>}
                                    placement="bottom">
                                    <Avatar
                                        style={{ width: 30, height: 30 }}
                                        alt={member?.fullname?.substring(0, 1) || 'G'}
                                        src={member?.imgUrl}>
                                        {member?.fullname?.substring(0, 1).toUpperCase() || 'G'}
                                    </Avatar>
                                </Tooltip>
                            )).reverse()}
                        </AvatarGroup>
                        :
                        <span className="empty-member flex center-center">
                            <img src={emptymember} alt="empty member" />
                        </span>
                    }

                </Button>

                <Menu
                    id="members-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    open={isOpen}
                    onClose={this.handleClose}
                    MenuListProps={{
                        "aria-labelledby": "open-menu-btn",
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    className="members-picker-menu align-center flex column gap">

                    <div className="task-members flex">

                        {task.members.length > 0 && task.members.map(member => (
                            <MenuItem
                                disableGutters
                                disableRipple={true}
                                key={member._id}
                                className="remove-member-item flex  gap space-between">

                                <div className="remove-member-item-content flex gap align-center">
                                    <Avatar
                                        style={{ width: 22, height: 22 }}
                                        // alt={member?.fullname.slice(0, 1)}
                                        src={member?.imgUrl}
                                        title={member?.fullname}>
                                        {member?.fullname.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                    <span className="member-name" >
                                        {member.fullname}
                                    </span>
                                </div>

                                <span className="remove-member-btn flex center-center fas fa-times"
                                    onClick={() => {
                                        funcs.onRemoveMemberFromTask(groupId, task.id, member._id)
                                    }} />

                            </MenuItem>
                        ))}
                    </div>

                    <div className="members-divider-container">
                        <Divider className="members-divider" />
                        <span className="members-divider-text">People</span>
                    </div>

                    <div className="board-users">
                        {board.members.length > 0 ?
                            board.members.map(member => (
                                <MenuItem
                                    disableGutters
                                    key={member._id}
                                    className="add-member-item flex grow align-center gap"
                                    onClick={() => {
                                        this.handleClose();
                                        funcs.onAddMemberToTask(groupId, task.id, member)
                                    }}>

                                    <div className="add-member-item-content flex gap align-center">
                                        <Tooltip
                                            arrow
                                            title={<h2 className="header-tool-tip">{member.fullname}</h2>}
                                            placement="bottom">
                                            <Avatar
                                                style={{ width: 25, height: 25 }}
                                                alt={member?.fullname.slice(0, 1)}
                                                src={member?.imgUrl}>
                                                {member?.fullname.substring(0, 1).toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                        <span className="member-name">
                                            {member.fullname}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))
                            :
                            <MenuItem
                                disableGutters
                                className="flex grow align-center gap"
                                onClick={() => this.handleClose()}>
                                No members in board, so lonely!
                            </MenuItem>

                        }
                    </div>

                </Menu>

            </section>
        )
    }
}