import { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { FilterModal } from './FilterModal';

export class BoardOptions extends Component {
  state = {
    isSearch: false,
    isFilter: false,
    filterBy: {
      name: '',
      member: '',
      group: '',
      status: '',
      priority: ''
    },
  };

  clearFilter = () => {
    this.setState({
      filterBy: {
        name: '',
        member: '',
        group: '',
        status: '',
        priority: ''
      },
    }, () => {
      this.props.funcs.onFilter(this.state.filterBy)
    })
  }

  componentDidMount() { }

  toggleSearch = () => {
    this.setState({ isSearch: !this.state.isSearch });
  };
  toggleFilterModal = () => {
    this.setState({ isFilter: !this.state.isFilter });
  };

  onFilter = (filter) => {
    this.setState({
      filterBy: {
        ...this.state.filterBy,
        [filter.field]: filter.value
      },
    }, () => {
      this.props.funcs.onFilter(this.state.filterBy)
    });

  };

  render() {
    const { funcs } = this.props;
    const { isSearch } = this.state;
    return (
      <section className="board-options flex align-center gap">
        <button className="btn-add-group" onClick={() => funcs.onAddGroup()}>
          Add Group
        </button>
        <div
          className={`btn-search flex align-center ${isSearch ? "searching" : ""
            }`}
          onClick={this.toggleSearch}
          onBlur={() => { this.setState({ isSearch: false }) }}
        >
          <SearchIcon />
          <input
            name='name'
            value={this.state.filterBy.name}
            className="input-search"
            type="text"
            autoComplete="off"
            onChange={(ev) => {
              this.onFilter({
                field: ev.target.name,
                value: ev.target.value
              })
            }}
            placeholder="Search"
          />
        </div>

        <FilterModal clearFilter={this.clearFilter} boards={this.props.boards} board={this.props.board} onFilter={this.onFilter} />
      </section>
    );
  }
}
