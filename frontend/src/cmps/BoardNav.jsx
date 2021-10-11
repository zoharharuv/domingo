import { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Badge, styled, Tooltip } from '@material-ui/core';
import { Notifications } from './Notifications';
import { socketService } from './../services/socket.service';
import logoImg from '../assets/imgs/logos/monday-logo.svg'
import workspaceImg from '../assets/imgs/svg/workspace.svg'

export class BoardNav extends Component {
    state = {
        notifications: [],
        isNewNotification: false
    }

    componentDidMount() {
        // setTimeout(() => {
        socketService.on("notification", ([boardId, notification]) => {
            if (boardId === this.props.board?._id
                && notification.byMember._id !== this.props.user._id

            ) {
                notification.createdAt = Date.now()
                this.setState({
                    notifications: [notification, ...this.state.notifications],
                    isNewNotification: true,
                });
            }
        })
        // }, 1000);
    }

    componentWillUnmount() {
        socketService.off("notification");
    }

    setOffNewNotification = () => {
        this.setState({
            isNewNotification: false
        })
    }

    render() {
        const StyledBadge = styled(Badge)(({ theme }) => ({
            '& .MuiBadge-badge': {
                backgroundColor: '#44b700',
                color: '#44b700',
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'ripple 1.2s infinite ease-in-out',
                    border: '1px solid currentColor',
                    content: '""',
                },
            },

        }));
        const { onLogout, user } = this.props
        return (
            <section className="board-nav">
                <section className="top-nav flex column align-center">
                    <span className="nav-logo">
                        <img src={logoImg} alt="miniLogo" />
                    </span>
                    <Tooltip title={<h2 className="tool-tip">Boards</h2>} placement="right-start"  >
                        <span
                        style={{
                            cursor:'pointer'
                        }}
                        onClick={()=>{
                            this.props.history.push(`/board/${this.props.board._id}`)
                        }} className="boards-icon">
                            <span>
                                <img src={workspaceImg} alt="board" />
                            </span>
                        </span>
                    </Tooltip>

                    <Notifications isNewNotification={this.state.isNewNotification} setOffNewNotification={this.setOffNewNotification} notifications={this.state.notifications} user={this.state.user} />

                </section>
                <section className="user-greeting">
                    <span className="inner-text">See plans</span>
                </section>
                <section className="bottom-nav">
                    <Tooltip title={<h2 className="tool-tip">Profile</h2>} placement="right-start"  >
                        <div className="user-profile">
                            <span className="profile"></span>
                        </div>
                    </Tooltip>

                    <Link to={`/user/${user?._id}`}>
                        <motion.button
                            style={{ background: 'transparent', border: 'none' }}
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 0.8 }}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot">
                                <Avatar
                                    style={{ width: 44, height: 44 }}
                                    alt={user?.fullname.slice(0, 1)}
                                    src={user?.imgUrl}>
                                    {user?.fullname.substring(0, 1).toUpperCase()}
                                </Avatar>
                            </StyledBadge>
                        </motion.button>
                    </Link>


                    <Tooltip title={<h2 className="tool-tip">Logout</h2>} placement="right-start"  >
                        <div className="user-tasks icon">
                            <span onClick={onLogout} className="fas fa-chart-logout"></span>
                        </div>
                    </Tooltip>
                </section>
            </section>
        )
    };
}

