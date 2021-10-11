import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import { loadBoards } from "./../store/actions/board.actions";
import { onLogout } from "./../store/actions/user.actions";
import logo from '../assets/imgs/logos/monday-logo.svg'

class _HomeHeader extends React.Component {
  state = {
    isOpen: false
  }
  componentDidMount() {
    this.onLoadBoards();
  }

  onLoadBoards = async () => {
    this.props.loadBoards();
  };

  onLogout = () => {
    this.props.onLogout()
    this.props.history.push('/')
  }

  setOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { boards, user, scroll } = this.props;
    const { isOpen } = this.state;
    return (
      <header className={`home-header ${scroll > 60 ? 'scrolled' : ''}`}>

        <div className={`screen ${isOpen ? 'active' : ''}`} onClick={this.setOpen}></div>

        <section className="header-content home-layout">
          <NavLink to="/" className="logo">
            <img src={logo} alt="logo" className="logo-svg" />
            <h1>
              DOmingo
            </h1>
          </NavLink>
          <NavLink className="get-started-btn" to={`/board/${boards[0]?._id}`}>
            {user && Object.keys(user).length > 0 ? 'To workspace' : 'Try as guest' }
            </NavLink>
          <nav onClick={this.setOpen} className={isOpen ? 'active' : ''}>
            <div className="user-info">
              {user && Object.keys(user).length > 0 ?
                <button className="logout-btn" onClick={this.onLogout}>Logout <span className="fas fa-sign-out-alt"></span></button>
                :
                <NavLink className="login-btn" to="/login">Login <span className="fas fa-sign-in-alt"></span></NavLink>
              }
            </div>
          </nav>
          <Hamburger toggled={isOpen} toggle={this.setOpen} />
        </section>

      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadBoards,
  onLogout
};

export const HomeHeader = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_HomeHeader)
);
