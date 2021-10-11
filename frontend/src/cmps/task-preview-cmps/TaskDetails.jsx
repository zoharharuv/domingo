import { Component } from "react";
import { connect } from "react-redux";
import { styled, Tabs, Tab, Box, Avatar, Badge } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { CommentOptions } from './CommentOptions'
import { MyEditor } from './MyEditor';
import { utilService } from "../../services/util.service";

function TabPanel(props) {
  const { children, value, tabIdx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== tabIdx}
      id={`activity-tabpanel-${tabIdx}`}
      aria-labelledby={`activity-tab-${tabIdx}`}
      {...other}>
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
    isRichText: false
  }

  richText = () => {
    this.setState({
      isRichText: true
    })
  }

  richTextOff = () => {
    this.setState({
      isRichText: false
    })
  }

  handleChange = (ev, value) => {
    this.setState({ value });
  };

  render() {
    const { task, onSubmit } = this.props
    const { value } = this.state

    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box sx={{ borderBottom: "1px solid #C5C6C7" }}>
          <Tabs
            indicatorColor="primary"
            value={value}
            onChange={this.handleChange}
            aria-label="basic tabs example"
          >
            <MyTab label="Updates" {...a11yProps(0)} />
            <MyTab sx={{ color: "red" }} label="Activity Log" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} tabIdx={0}>
          <div className="updates-container flex column ">

            {
              !this.state.isRichText ? <div onClick={this.richText} className='task-updates-placeholder'><span className='content'>Write An Update...</span></div> :
                <MyEditor
                  onSubmit={onSubmit}
                  richTextOff={this.richTextOff}/>
            }

            <div className="comments-container flex column">
              {task.comments.length ? (
                task.comments.map((comment, idx) => {
                  return (
                    <div key={idx} className="comment-full-container">
                      <div className="comment-container flex">
                        <div className="comment-container-header flex space-between">
                          <div className="user-item flex align-center gap">
                            <Badge overlap="circular" variant="dot">
                              <Avatar
                                style={{ width: 45, height: 45 }}
                                alt={comment.byMember.fullname.slice(0, 1)}
                                src={comment.byMember.imgUrl}>
                                {comment.byMember.fullname
                                  .substring(0, 1)
                                  .toUpperCase()}
                              </Avatar>
                            </Badge>
                            <span className="user-link">
                              {comment.byMember.fullname}
                            </span>
                          </div>

                          <div className="clock flex align-center">
                            <AccessTime style={{ color: "lightgray", width: 17 }} />
                            <span>{utilService.timeSince(comment.createdAt)}</span>

                          </div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{ __html: `${comment.txt}` }}
                          className="comment-container-body flex ">
                        </div>

                        <div className="comment-container-footer flex ">
                          {`👁 ${Math.ceil(Math.random() * 5)} Seen`}
                        </div>
                      </div>

                      <CommentOptions />

                    </div>
                  );
                })
              ) : (
                <div className="update-container">No Updates Yet...</div>
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} tabIdx={1}>
          Activity Log
        </TabPanel>
      </Box>
    );
  }
}

class _TaskDetails extends Component {
  onSubmit = (content) => {
    this.props.funcs.onPostComment(
      this.props.groupId,
      this.props.task.id,
      content
    );
  };

  handleChange = (ev) => {
    this.setState({
      update: ev.target.value,
    });
  };

  render() {
    // const { user, board, funcs } = this.props
    const { task } = this.props;
    return (
      <section className="task-details">
        <h1 className="task-details-title">{task.title}</h1>
        <BasicTabs
          onSubmit={this.onSubmit}
          task={task}
        />
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

export const TaskDetails = connect(mapStateToProps)(_TaskDetails);
