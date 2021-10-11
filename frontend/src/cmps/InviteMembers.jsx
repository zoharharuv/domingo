import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Button } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import { loadUsers } from './../store/actions/user.actions';

class _InviteMembers extends Component {
    state = {
        filterBy: {
            name: '',
        },
    };

    componentDidUpdate(prevProps, prevState) {
    }

    handleChange = (ev) => {
        const name = ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, name }, }, () => {
            this.props.loadUsers(this.state.filterBy)
        });
    }

    render() {
        const { board, users, funcs } = this.props
        const { name } = this.state.filterBy
        return (
            <section className="invite-members flex column">
                <h1 className="invite-members-header flex grow">Board Members</h1>
                <input
                    value={name}
                    type="search"
                    placeholder="Enter name or email"
                    onChange={this.handleChange} />

                <div className="members-container">
                    <div className="board-members flex column gap">{
                        board.members.map((user, idx) => (
                            <div key={idx} className="flex space-between align-center">
                                <div className="user-item flex align-center gap">
                                    <Avatar style={{ width: 30, height: 30 }} alt={user.fullname} src={user?.imgUrl} />
                                    <span className="user-link">
                                        <Link to={`/user/${user._id}`}>{user.fullname}</Link>
                                    </span>
                                </div>
                                <Button
                                    className="remove-user"
                                    onClick={() => {
                                        funcs.onRemoveUserFromBoard(user._id)
                                        this.props.loadUsers()
                                    }}>
                                    <Close style={{ color: '#323338', fontSize: '1rem' }} />
                                </Button>
                            </div>
                        ))
                    }</div>

                    <h3>All users</h3>
                    <div className="all-members flex column gap">{
                        users.map(user => (
                            <div key={user._id} className="flex space-between align-center">
                                <div className="user-item flex align-center gap">
                                    <Badge
                                        overlap="circular"
                                        variant="dot">
                                        <Avatar
                                            style={{ width: 30, height: 30 }}
                                            alt={user?.fullname.slice(0, 1)}
                                            src={user?.imgUrl}>
                                            {user?.fullname.substring(0, 1).toUpperCase()}
                                        </Avatar>
                                    </Badge>
                                    <span className="user-link">
                                        <Link to={`/user/${user._id}`}>{user?.fullname}</Link>
                                    </span>
                                </div>
                                <Button
                                    className="add-user"
                                    onClick={() => {
                                        funcs.onAddUserToBoard(user)
                                        this.props.loadUsers()
                                    }}>
                                    <Add style={{ color: '#666666' }} />
                                </Button>
                            </div>
                        ))
                    }</div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        users: state.userModule.users,
        board: state.boardModule.board,
    };
}

const mapDispatchToProps = {
    loadUsers,
};

export const InviteMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)(_InviteMembers);
