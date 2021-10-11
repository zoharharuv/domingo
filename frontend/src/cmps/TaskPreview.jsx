import { Component } from "react";
import { Calendar } from "react-date-range";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { MoreInfo } from "./MoreInfo";
import { LabelPicker } from "./task-preview-cmps/LabelPicker";
import { MemberPicker } from "./task-preview-cmps/MemberPicker";
import { setModalData } from "../store/actions/system.actions";

class _TaskPreview extends Component {
  state = {
    isCalenderOpen: false,
    title: "",
    isFocused: false,
    isHover: false,
    isEditHover: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.task.comments?.length !== this.props?.task?.comments?.length) {
      this.props.setModalData({
        component: "TaskDetails",
        task: this.props?.task,
        groupId: this.props?.modalData?.groupId,
      });
    }
  }

  componentDidMount() {
    this.setState({ title: this.props.task.title });
  }

  handleChange = (ev) => {
    this.setState({ title: ev.target.value });
  };

  toggleInput = () => {
    this.setState({ isFocused: !this.state.isFocused });
  };

  toggleCalendar = () => {
    this.setState({ isCalenderOpen: !this.state.isCalenderOpen });
  };

  handleSelect = (date) => {
    const { groupId, task, funcs } = this.props;
    const dueDate = Date.parse(date);
    funcs.onEditTask(groupId, task.id, { dueDate });
    this.setState({ isCalenderOpen: false });
  };

  dateToShow = (timestamp) => {
    if (!timestamp) return "";
    var newDate = new Date(timestamp);
    var options = {
      day: "numeric",
      month: "short",
    };
    const sDay = newDate.toLocaleDateString("en-US", options);
    return sDay;
  };

  render() {
    const { board, task, funcs, groupId, borderStyle, boardId } = this.props;
    const { isCalenderOpen, title, isFocused, isHover, isEditHover } = this.state;

    const infoItems = [
      { title: 'Rename task', icon: 'CreateOutlined' },
      { title: 'Duplicate task', icon: 'FileCopyOutlined' },
      { title: 'Create new task', icon: 'AddCircleOutline' },
      { title: 'Divider' },
      { title: 'Remove task', icon: 'DeleteOutlined' },
      { title: 'Archive task', icon: 'ArchiveOutlined' },
    ];

    return (
      <section className="task-preview flex  align-center" style={borderStyle}>
        <div className="task-expand-btn flex align-center justify-center">
          <MoreInfo
            icon={"arrow"}
            funcs={funcs}
            items={infoItems}
            location={{ boardId, groupId, taskId: task.id }}
          />
        </div>

        <div
          className={`task-content flex grow space-between align-center
        ${isFocused ? "focused" : ""}`}
          onMouseEnter={() => {
            this.setState({ isHover: true });
          }}
          onMouseLeave={() => {
            this.setState({ isHover: false });
          }}
        >
          {isFocused ? (
            <form
              onSubmit={() => {
                this.setState({
                  isFocused: false,
                  isHover: false,
                  isEditHover: false,
                });
                funcs.onEditTask(groupId, task.id, { title });
              }}>
              <input
                className={`task-title-input`}
                style={{ background: "white", color: "#333333" }}
                type="text"
                spellCheck="false"
                autoFocus
                value={title}
                onChange={this.handleChange}
                onBlur={(ev) => {
                  this.setState({ isFocused: false });
                  funcs.onEditTask(groupId, task.id, { title });
                }}
              />
            </form>
          ) : (
            <div className="title-preview flex align-center gap">
              <span
                style={
                  isHover && isEditHover
                    ? { border: "1px solid #c4c4c4" }
                    : { border: "transparent 1px solid" }
                }
                className="task-title-span">
                {task.title}
              </span>
              {isHover && (
                <button
                  onMouseEnter={() => {
                    this.setState({ isEditHover: true });
                  }}
                  onMouseLeave={() => {
                    this.setState({ isEditHover: false });
                  }}
                  className="edit-title-btn"
                  onClick={this.toggleInput}
                >
                  Edit
                </button>
              )}
            </div>
          )}
          <span
            onClick={() =>
              funcs.onToggleModal({
                component: "TaskDetails",
                task,
                groupId,
              })
            }
            className="task-chat far fa-comment"
          >
            {task.comments.length ?
              <span className="task-chat-updates flex center-center">{task.comments.length || ''}</span>
              : ''
            }
          </span>
        </div>

        <div className="task-items flex">

          <MemberPicker
            task={task}
            board={board}
            groupId={groupId}
            funcs={funcs} />

          <div className="date flex center-center"
            onClick={this.toggleCalendar}>
            <span>
              {this.dateToShow(task.dueDate) || ""}
            </span>
            <div
              className="calendar"
              onMouseLeave={() => this.setState({ isCalenderOpen: false })}
              onClick={(ev) => ev.stopPropagation()}
            >
              {isCalenderOpen && (
                <Calendar
                  date={new Date(task.dueDate || Date.now())}
                  onChange={this.handleSelect}
                  scroll={{ enabled: true }}
                  showMonthArrow={true}
                />
              )}
            </div>
          </div>

          <div
            style={{ backgroundColor: task?.status?.color }}
            className={`status ${task.status ? "fill" : ""}`}
          >
            <span className="fold"></span>
            <LabelPicker
              title={task.status.title}
              type={"status"}
              funcs={funcs}
              location={{ boardId, groupId, taskId: task.id }}
            />
          </div>

          <div
            style={{ backgroundColor: task?.priority?.color }}
            className={`priority ${task.priority ? "fill" : ""} `}
          >
            <span className="fold"></span>
            <LabelPicker
              title={task.priority.title}
              type={"priority"}
              funcs={funcs}
              location={{ boardId, groupId, taskId: task.id }}
            />
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    modalData: state.systemModule.modalData,
  };
}
const mapDispatchToProps = {
  setModalData,
};

export const TaskPreview = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_TaskPreview)
);
