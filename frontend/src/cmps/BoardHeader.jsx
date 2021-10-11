import { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion'
import { Avatar, Tooltip, Button } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import {
    Info,
    InfoOutlined,
    StarOutline,
    TrendingUp,
    PollOutlined,
    TableChartOutlined,
    Home
} from '@material-ui/icons';
import { BoardOptions } from './BoardOptions';
import { MoreInfo } from './MoreInfo';

class _BoardHeader extends Component {
    state = {
        isDescShown: false,
    }

    componentDidMount() {
    }

    showDesc = () => {
        this.setState({ isDescShown: !this.state.isDescShown })
    }

    render() {
        const { board, users, funcs, setContainerView, isDashboard } = this.props
        const { isDescShown } = this.state

        const infoItems = [
            { title: 'Board members', icon: 'PersonAddOutlined' },
            { title: 'Board activity', icon: 'TrendingUpOutlined' },
            { title: 'Divider' },
            { title: 'Delete board', icon: 'DeleteOutlined' },
            { title: 'Archive board', icon: 'ArchiveOutlined' }
        ];

        return (
            <section className="board-header flex column">

                <div className="header-top flex align-center">

                    <div className="board-title-container flex align-center">
                        <Tooltip
                            arrow
                            title={<h2 className="header-tool-tip">Click to edit</h2>}
                            placement="bottom">
                            <h1
                                suppressContentEditableWarning={true}
                                onBlur={(ev) => {
                                    const title = ev.target.innerText
                                    funcs.onEditBoard({ title })
                                }}
                                contentEditable={true}
                            >
                                {board.title ? board.title : ''}
                            </h1>
                        </Tooltip>

                        <Tooltip
                            arrow
                            title={<h2 className="header-tool-tip">{isDescShown ? 'Hide' : 'Show'} board description</h2>}
                            placement="bottom">
                            <motion.button
                                whileHover={{ scale: 1 }}
                                whileTap={{ scale: 0.9 }}
                                className="header-info" onClick={this.showDesc}>
                                {isDescShown ? <Info color={'disabled'} /> : <InfoOutlined color={'disabled'} />}
                            </motion.button>
                        </Tooltip>

                        <Tooltip
                            arrow
                            title={<h2 className="header-tool-tip">Add to favorites</h2>}
                            placement="bottom">
                            <motion.button
                                whileHover={{ scale: 1 }}
                                whileTap={{ scale: 0.9 }}
                                className="header-fav">
                                <StarOutline color={'disabled'} />
                            </motion.button>
                        </Tooltip>
                    </div>

                    <div className="board-header-actions flex align-center gap">

                        <button className="header-action board-members-avatars flex center-center gap">
                            Last seen
                            <AvatarGroup spacing={5} max={3}>
                                {board.members.map((member, idx) => (
                                    <Tooltip
                                        arrow
                                        title={<h2 className="header-tool-tip">{member.fullname}</h2>}
                                        key={member._id}
                                        placement="bottom">
                                        <Avatar
                                            style={{ width: 28, height: 28 }}
                                            alt={member?.fullname.slice(0, 1)}
                                            src={member?.imgUrl}>
                                            {member?.fullname.substring(0, 1).toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                )).reverse()}
                            </AvatarGroup>
                        </button>

                        <motion.button
                            whileHover={{ scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            className="header-action invite"
                            onClick={() => funcs.onToggleMainModal({ component: 'InviteMembers' })}>
                            <span className="fas fa-user-plus" />Invite / {users?.length}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            className="header-action activity flex align-center"
                            onClick={() => funcs.onToggleModal({ component: 'ActivityLog' })}>
                            <TrendingUp fontSize={'small'} />Activity
                        </motion.button>

                        <motion.button
                      
                            whileHover={{ scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            className="header-action add-to-board flex center-center">
                            <span className="fas fa-plus" />Add to board
                        </motion.button>

                        <MoreInfo icon={'dots'} funcs={funcs} items={infoItems} location={{ boardId: board._id }}/>
                    </div>

                </div>

                {isDescShown && <div className="board-desc-container flex wrap">
                    <span
                        suppressContentEditableWarning={true}
                        onBlur={(ev) => {
                            const description = ev.target.innerText
                            funcs.onEditBoard({ description })
                        }}
                        contentEditable={true}
                    >
                        {board?.description || 'Add board description'}
                    </span>
                </div>}


                <div className="board-views flex grow">
                    <div className={`board-views-btn ${!isDashboard ? 'active' : ''}`}>
                        <Button
                            onClick={() => {
                                setContainerView(false)
                            }}
                            disableRipple>
                            <TableChartOutlined
                                fontSize={'small'}
                                style={{ marginRight: 5, color: '#323338', position: 'relative' }} />
                            <Home
                                style={{
                                    borderRadius: '50%',
                                    bottom: '8px',
                                    fontSize: '11px',
                                    position: 'absolute',
                                    left: '28px',
                                    background: 'white'
                                }} />
                            <span style={{ marginLeft: 5 }}>Main Table</span>
                        </Button>
                    </div>
                    <div className={`board-views-btn ${isDashboard ? 'active' : ''}`}>
                        <Button
                            onClick={() => {
                                setContainerView(true)
                            }}
                            disableRipple>
                            <PollOutlined
                                fontSize={'small'}
                                style={{ marginRight: 5, color: '#323338' }} />
                            Dashboard
                        </Button>
                    </div>
                </div>

                <BoardOptions boards={this.props.boards} board={this.props.board} funcs={funcs} />
            </section>
        )
    };
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        users: state.userModule.users,
        board: state.boardModule.board,
        boards: state.boardModule.boards,
        modalData: state.systemModule.modalData,
        modal: state.systemModule.modal,
        mainModal: state.systemModule.mainModal,
    };
}

export const BoardHeader = connect(mapStateToProps)(_BoardHeader);
