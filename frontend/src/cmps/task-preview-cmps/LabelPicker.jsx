import { Component } from "react";
import { connect } from "react-redux";
import { MenuItem, Menu, Button } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Edit,
  RemoveCircleOutline,
} from "@material-ui/icons";
import { utilService } from './../../services/util.service';


class _LabelPicker extends Component {
  // type = priority, board info, etc..
  // funcs = funcs from BoardApp
  // location = boardId, groupId, taskId
  state = {
    anchorEl: null,
    name: "",
    color: "#C4C4C4",
    edited: null,
    EditAdd: false,
  };

  handleDragEnd = (res) => {
    const { type } = this.props;

    if (type === "status") {
      const newStatuses = Array.from(this.props.board.statuses);
      //splicing out the dragged toy
      const [reorderedStatus] = newStatuses.splice(res.source.index, 1);
      //inserts the toy to the destination
      newStatuses.splice(res.destination.index, 0, reorderedStatus);

      this.props.funcs.onStatusPriorityReordered(type, newStatuses);
    } else {
      const newPriorities = Array.from(this.props.board.priorities);
      //splicing out the dragged toy
      const [reorderedPriority] = newPriorities.splice(res.source.index, 1);
      //inserts the toy to the destination
      newPriorities.splice(res.destination.index, 0, reorderedPriority);

      this.props.funcs.onStatusPriorityReordered(type, newPriorities);
    }
  };

  toggleEditAdd = () => {
    const { EditAdd } = this.state;
    this.setState({
      EditAdd: !EditAdd,
    });
  };

  onColor = (color) => {
    if (!this.state.edited) {
      this.setState({
        color,
      });
    } else {
      const edited = {
        ...this.state.edited,
        color,
      };

      this.setState({
        edited,
      });
    }
  };

  onSubmit = (ev) => {
    ev.preventDefault();

    const { name, color, edited } = this.state;

    //add mode
    if (!edited) {
      if (this.props.type === "status") {
        const status = {
          color,
          title: name,
        };

        this.props.funcs.onAddStatus(status);
      } else {
        const priority = {
          color,
          title: name,
        };

        this.props.funcs.onAddPriority(priority);

        this.setState({
          name: "",
        });
      }
      //edit mode
    } else {
      if (this.props.type === "status") {
        this.props.funcs.onUpdateStatusPriority("status", this.state.edited);
      } else {
        this.props.funcs.onUpdateStatusPriority("priority", this.state.edited);
      }
    }

    this.setState({
      name: "",
      color: "#C4C4C4",
      edited: null,
    });
  };

  handleRemove = (id) => {
    const { type } = this.props;
    this.props.funcs.onRemoveStatusPriority(type, id);
  };

  handleChange = (ev) => {
    if (this.state.edited)
      this.setState({
        edited: {
          ...this.state.edited,
          title: ev.target.value,
        },
      });
    else
      this.setState({
        name: ev.target.value,
      });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const { board, type, funcs, location, title } = this.props;
    const colors = utilService.getLabelColors()
    colors.push({ idx: 36, bgColor: "rgb(23, 5, 99)", });

    return (
      <>
        <Button
          className={`label-picker flex align-center label-picker-btn ${open ? "open" : "close"
            }`}
          id="info-button"
          aria-controls="info-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={this.handleClick}
          style={{
            padding: "1px",
          }}
        >
          <span style={{ width: "100%", height: "100%" }}>{title}</span>
        </Button>

        <Menu
          PaperProps={{
            style: {
              width: 195,
            },
          }}
          id="info-menu"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "info-button",
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          className="label-picker-menu"
        >
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable type={type} droppableId="items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    {
                      status: board.statuses.map((status, index) => (
                        <Draggable
                          key={status.id}
                          draggableId={status.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              {/* <span onClick={()=>{
                                this.setState({
                                  edited:null
                                })
                              }}>
                              </span> */}
                              {/* <Add
                               fontSize="small"
                               color="action"
                              /> */}

                              <MenuItem key={status.id}>
                                {this.state.EditAdd && (
                                  <Edit
                                    className="edit-icon"
                                    onClick={() => {
                                      this.setState({
                                        edited: status,
                                      });
                                    }}
                                    fontSize="small"
                                    color="action"
                                  />
                                )}

                                <span
                                  {...provided.dragHandleProps}
                                  className={`label-pick ${status.id}`}
                                  onClick={(ev) => {
                                    //data set not working!
                                    const id = ev.target.classList[1];

                                    const status = board.statuses.find(
                                      (status) => status.id === id
                                    );

                                    funcs.onStatus(
                                      location.groupId,
                                      location.taskId,
                                      status
                                    );
                                    this.handleClose();
                                  }}
                                  style={{ backgroundColor: status.color }}
                                >
                                  {status.title}
                                </span>
                                {this.state.EditAdd && (
                                  <span
                                    className="remove-icon"
                                    onClick={() => {
                                      this.handleRemove(status.id);
                                    }}
                                  >
                                    <RemoveCircleOutline
                                      fontSize="small"
                                      color="action"
                                    />
                                  </span>
                                )}
                              </MenuItem>
                            </div>
                          )}
                        </Draggable>
                      )),
                      priority: board.priorities.map((priority, index) => (
                        <Draggable
                          key={priority.id}
                          draggableId={priority.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <span
                                onClick={() => {
                                  this.setState({
                                    edited: priority,
                                  });
                                }}
                              ></span>

                              <MenuItem key={priority.id}>
                                {this.state.EditAdd && (
                                  <Edit
                                    className="edit-icon"
                                    onClick={() => {
                                      this.setState({
                                        edited: priority,
                                      });
                                    }}
                                    fontSize="small"
                                    color="action"
                                  />
                                )}

                                <span
                                  {...provided.dragHandleProps}
                                  className={`label-pick ${priority.id}`}
                                  onClick={(ev) => {
                                    const id = ev.target.classList[1];

                                    const priority = board.priorities.find(
                                      (priority) => priority.id === id
                                    );

                                    funcs.onPriority(
                                      location.groupId,
                                      location.taskId,
                                      priority
                                    );

                                    this.handleClose();
                                  }}
                                  style={{ backgroundColor: priority.color }}
                                >
                                  {priority.title}
                                </span>
                                {this.state.EditAdd && (
                                  <span
                                    className="remove-icon"
                                    onClick={() => {
                                      this.handleRemove(priority.id);
                                    }}
                                  >
                                    <RemoveCircleOutline
                                      fontSize="small"
                                      color="action"
                                    />
                                  </span>
                                )}
                              </MenuItem>
                            </div>
                          )}
                        </Draggable>
                      )),
                    }[type]
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button

            className="edit-add-btn flex center-center gap"
            onClick={this.toggleEditAdd}
          >
            {!this.state.EditAdd ? (
              <>
                <Edit fontSize="small" color="#0073ea" />
                <span>Edit/Add Labels</span>
              </>
            ) : (
              <span>Close Panel</span>
            )}
          </button>

          {this.state.EditAdd && (
            <div className="add-priority-container">
              <form onSubmit={this.onSubmit} className="flex column center-center" action="">
                {/* {this.state.edited ? `Edit ${type}` : `Add ${type}`} */}
                <input
                  placeholder={`Enter ${type} title`}
                  style={{
                    backgroundColor: this.state.edited
                      ? this.state.edited.color
                      : this.state.color,
                  }}
                  className="label-name-input"
                  onChange={this.handleChange}
                  value={
                    this.state.edited
                      ? this.state.edited.title
                      : this.state.name
                  }
                  type="text"
                />
              </form>
              <span
                className="fas fa-times clear-label"
                onClick={() => {
                  this.setState({
                    name: "",
                    color: "#ffffff",
                    edited: null,
                  });
                }}
              >
                
              </span>
              <div className="label-colors flex">
                {colors.map((color, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      this.onColor(color.bgColor);
                    }}
                    className={`label-color`}
                  >
                    <div
                      style={{ backgroundColor: color.bgColor }}
                      className="label-color-circle"
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Menu>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {};

export const LabelPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LabelPicker);
