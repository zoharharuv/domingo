import { Component } from 'react';
import { connect } from 'react-redux';
import { MoreInfo } from './MoreInfo';
import { IconButton, InputAdornment, TextField, styled, } from '@material-ui/core';
import { Search as SearchIcon, Add } from '@material-ui/icons';
import filterIcon from '../assets/imgs/filter-icon.png'
import { loadBoards } from "./../store/actions/board.actions";
import boardIcon from '../assets/imgs/svg/wave.svg'

const SearchField = styled(TextField)(({ theme }) => ({
    '&.MuiTextField-root': {
        backgroundColor: 'transparent',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
    },
}));

class _BoardAside extends Component {
    state = {
        isOpen: false,
        filterBy: {
            title: ''
        }
    }

    componentDidMount() {
        if (!this.props.boards.length) this.onLoadBoards()
    }

    onLoadBoards = async () => {
        this.props.loadBoards();
    };

    toggleNav = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleChange = (ev) => {
        // const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, title: value }, }, () => {
            this.props.loadBoards(this.state.filterBy)
        });
    }

    render() {
        const { boards, funcs } = this.props
        const { isOpen } = this.state
        const infoItems = [
            { title: 'Rename board', icon: 'CreateOutlined' },
            { title: 'Duplicate board', icon: 'FileCopyOutlined' },
            { title: 'Divider' },
            { title: 'Delete board', icon: 'DeleteOutlined' },
            { title: 'Archive board', icon: 'ArchiveOutlined' }
        ]
        return (
            <section className={`flex column align-center ${isOpen ? "board-aside open" : "board-aside"}`}>
                <h1>   </h1>
                <button
                    className={`aside-board-btn ${isOpen ? 'open' : ''}`}
                    onClick={this.toggleNav}

                ><span className="btn-content fas fa-chevron-right" /></button>
                <section className={`aside-board-items  flex column gap   ${isOpen ? 'open' : ''}`}>
                    <h2>Board Options</h2>

                    <div className='aside-tool flex align-center' onClick={() => funcs.onAddBoard()}>
                        <InputAdornment position={'start'}>
                            <IconButton>
                                <Add />
                            </IconButton>
                        </InputAdornment>
                        <span>New</span>
                    </div>

                    <div className='filter-item aside-tool flex align-center' >
                        <InputAdornment position={'start'}>
                            <IconButton>
                                <img src={filterIcon} alt="" style={{ height: '1.5rem' }} />
                            </IconButton>
                        </InputAdornment>
                        <span>Filters</span>
                    </div>


                    <div className="search-item aside-tool flex align-center">
                        <SearchField
                            onChange={this.handleChange}
                            placeholder="Search"
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment position={'start'}>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <span className="aside-padding" />
                    {boards.map((board, idx) =>
                        <div className={`aside-board-select flex gap align-center space-between num-${idx}`} key={idx}>
                            <div className="aside-left gap flex align-center">
                                <img src={boardIcon} className="board-icon" alt="test" />
                                <span
                                    onClick={() => funcs.onLoadBoard(board._id)}>
                                    {board.title}
                                </span>
                            </div>
                            <MoreInfo icon={'dots'} funcs={funcs} items={infoItems} location={{ boardId: board._id }} />
                        </div>
                    )}
                </section>
            </section >
        )
    };
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
    };
}
const mapDispatchToProps = {
    loadBoards,
};

export const BoardAside = connect(mapStateToProps, mapDispatchToProps)(_BoardAside);


