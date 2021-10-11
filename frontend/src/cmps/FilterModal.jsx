import { Component } from 'react';
import { Menu, Button, Avatar } from '@material-ui/core';
import filterIcon from '../assets/imgs/filter-icon.png';

export class FilterModal extends Component {
    state = {
        anchorEl: null,
    };

    getCurrentBoard = (boards) => {
        return boards.find(board => board._id === this.props.board._id)
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { boards } = this.props
        const currentBoard = this.getCurrentBoard(boards)
        const { anchorEl } = this.state;
        const isOpen = Boolean(anchorEl);
        return (
            <>
                <Button
                    className="filter-btn flex center-center"
                    id="open-menu-btn"
                    aria-controls="filter-menu"
                    aria-haspopup="true"
                    aria-expanded={isOpen ? "true" : undefined}
                    onClick={this.handleClick}
                    style={{ textTransform: 'capitalize' }}>
                    <img src={filterIcon} alt="filterIcon" style={{ height: "20px" }} />
                    <span style={{ paddingLeft: 5 }}>Filter</span>
                </Button>
                <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    open={isOpen}
                    onClose={this.handleClose}
                    MenuListProps={{
                        "aria-labelledby": "open-menu-btn",
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    className="filter-menu"
                >
                    <button className="clear-all-btn"
                        onClick={this.props.clearFilter}>Clear All</button>
                    <section
                        className="filter-modal flex"
                        onClick={(ev) => ev.stopPropagation()}>
                        <div className="filter-column flex column gap align-start">
                            <h1>Groups</h1>
                            {currentBoard?.groups.map((group) => (
                                <span className="filter-item text" key={group.id}
                                    onClick={() => {
                                        this.props.onFilter({
                                            field: 'group',
                                            value: group.id
                                        })
                                    }}>{group.title}</span>
                            ))}
                        </div>
                        <div className="filter-column flex column gap align-start">
                            <h1>Members</h1>
                            {currentBoard?.members.map((member) => (
                                <div className="filter-item flex align-center gap"
                                    key={member._id}
                                    onClick={() => {
                                        this.props.onFilter({
                                            field: 'member',
                                            value: member.fullname
                                        })
                                    }}
                                >
                                    <Avatar
                                        style={{ width: 25, height: 25 }}
                                        src={member?.imgUrl}>
                                        {member?.fullname.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                    <span className="text">{member.fullname}</span>
                                </div>
                            ))}

                        </div>
                        <div className="filter-column flex column gap align-start">
                            <h1>Status</h1>
                            {currentBoard?.statuses.map((status) => (
                                <span className="filter-item label"
                                    key={status.id}
                                    style={{ background: status.color }}
                                    onClick={() => {
                                        this.props.onFilter({
                                            field: 'status',
                                            value: status.title
                                        })
                                    }}>{status.title}</span>
                            ))}
                        </div>
                        <div className="filter-column flex column gap align-start">
                            <h1>Priority</h1>
                            {currentBoard?.priorities.map((priority) => (
                                <span className="filter-item label"
                                    key={priority.id}
                                    style={{ background: priority.color }}
                                    onClick={() => {
                                        this.props.onFilter({
                                            field: 'priority',
                                            value: priority.title
                                        })
                                    }}>{priority.title}</span>
                            ))}
                        </div>
                    </section>
                </Menu>
            </>
        );
    }
}
