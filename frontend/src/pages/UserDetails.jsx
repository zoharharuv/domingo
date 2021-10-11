import { Component } from "react";
import { connect } from "react-redux";
import { BoardNav } from "./../cmps/BoardNav";
import { BoardAside } from "./../cmps/BoardAside";
import { styled, Tabs, Tab, Box, Avatar, Badge } from "@material-ui/core";

import { onLogout,updateUser } from "./../store/actions/user.actions";

function TabPanel(props) {
  const { children, value, tabIdx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== tabIdx}
      id={`activity-tabpanel-${tabIdx}`}
      aria-labelledby={`activity-tab-${tabIdx}`}
      {...other}
    >
      {value === tabIdx && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

const MyTab = styled(Tab)(() => ({
  "text-transform": "capitalize",
}));

function a11yProps(tabIdx) {
  return {
    id: `activity-tab-${tabIdx}`,
    "aria-controls": `activity-tabpanel-${tabIdx}`,
  };
}

class BasicTabs extends Component {

  state = {
    value: 0,
    user:this.props.user
  };

  onSubmit = (ev) => {
      ev.preventDefault()
      this.props.updateUser(this.state.user)
  }

  handleField = (ev) => {
  this.setState(prev => ({
      user: {
          ...prev.user,
          [ev.target.name]: ev.target.value
      }
  }))
  }

  handleChange = (ev, value) => {
    this.setState({ value });
  };

  render() {
    const { value,user } = this.state;

    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box sx={{ borderBottom: "1px solid #C5C6C7" }}>
          <Tabs
            indicatorColor="primary"
            value={value}
            onChange={this.handleChange}
            aria-label="basic tabs example"
          >
            <MyTab label="User Details" {...a11yProps(0)} />
            <MyTab
              sx={{ color: "red" }}
              label="Edit Profile"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} tabIdx={0}>

          <div className='user-details-content '>
          {
              
              <Badge overlap="circular" variant="dot">
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt={user?.fullname.slice(0, 1)}
                  src={user?.imgUrl}
                  >
                  {user?.fullname.substring(0, 1).toUpperCase()}
                </Avatar>
              </Badge>
            }
          <h4>Username: {user?.username}</h4>
          <h4>Fullname: {user?.fullname}</h4>
           
            </div>

        </TabPanel>
        <TabPanel value={value} tabIdx={1}>

        <div className='user-details-content '>


          <form onSubmit={this.onSubmit} className='flex column gapx2' action="">
            <span>

            <h4>Full Name:</h4>
              <input onChange={this.handleField} value={user?.fullname} className='input'
              placeholder='Enter Username' id='fullname' name='fullname' type="text" />
              </span>
              <span>
              <h4>Img Url:</h4>
              <input onChange={this.handleField} value={user?.imgUrl} className='input'
              placeholder='Enter Username' id='imgurl' name='imgUrl' type="text" />
              </span>
              <button>Save</button>
          </form>

          </div>

        </TabPanel>
      </Box>
    );
  }
}

class _UserDetails extends Component {

  onLogout = () => {
    this.props.onLogout();
    this.props.history.push("/");
  };

  render() {
    const { board, user } = this.props;
    return (
      <section className="user-details">
        <BoardNav history={this.props.history} onLogout={this.onLogout} board={board} user={user} />

        <div className="user-details-container flex column">
          <div className="user-details-header flex column gap center-center">
            <div className="user-details-avatar">
              <Badge overlap="circular" variant="dot">
                <Avatar
                  style={{ width: 45, height: 45 }}
                  alt={user?.fullname.slice(0, 1)}
                  src={user?.imgUrl}
                >
                  {user?.fullname.substring(0, 1).toUpperCase()}
                </Avatar>
              </Badge>
            </div>

            <div className="user-details-name">{user?.fullname}</div>
          </div>

          <div className="user-details-body">
            <BasicTabs updateUser={this.props.updateUser} user={user} />
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  onLogout,
  updateUser
};

export const UserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserDetails);
