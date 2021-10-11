import { Component } from "react";
import { GroupHeader } from "./GroupHeader";
import { TaskList } from "./TaskList";
import { GroupProgressBar } from "./GroupProgressBar";
import { DragIndicator } from "@material-ui/icons";
import { MoreInfo } from './MoreInfo';
export class GroupPreview extends Component {
  state = {
    isFocused: false,
    isHover: false,
    isTaskAdd: false,
    isGroupFocus: false,
    title: ''
  };
  componentDidMount() {
  }

  onSubmit = (ev) => {
    ev.preventDefault()
    this.props.funcs.onAddTask(this.props.group.id, null, this.state.title)
    this.setState({
      isTaskAdd: false,
      title: ''
    })
  }

  handleChange = (ev) => {
    this.setState({
      title: ev.target.value
    })
  }

  focusOnGroup = () => {
    this.setState({
      isGroupFocus: true,
    })
  }

  focusOffGroup = () => {
    this.setState({
      isGroupFocus: false
    })
  }

  focusOnAdd = () => {
    this.setState({
      isTaskAdd: true
    })
  }

  focusOffAdd = () => {
    this.setState({
      isTaskAdd: false
    })
  }

  toggleHover = (isHover) => {
    this.setState({ isHover })
  }

  render() {
    const { group, funcs, boardId, provided } = this.props;
    const { isGroupFocus, isHover } = this.state;
    const styles = group.style;
    const infoItems = [
      { title: 'Add group', icon: 'AddCircleOutline' },
      { title: 'Duplicate group', icon: 'FileCopyOutlined' },
      { title: 'Divider' },
      { title: 'Rename group', icon: 'CreateOutlined' },
      { title: 'Change group color', icon: 'ColorLensOutlined' },
      { title: 'Divider' },
      { title: 'Remove group', icon: 'DeleteOutlined' },
      { title: 'Archive group', icon: 'ArchiveOutlined' },
    ]
    funcs.focusOn = this.focusOnGroup
    return (
      <section className="group-preview flex gap">

        <div className="group-expand-btn"
         style={{
          color: styles.bgColor,
          backgroundColor: styles.bgColor,
          border: `1px solid ${styles.bgColor}`}}>
          <MoreInfo
            icon={'arrow'}
            funcs={funcs}
            items={infoItems}
            location={{ boardId, groupId: group.id }} />
        </div>

        <div className="group-content grow">

          <GroupHeader
            toggleHover={this.toggleHover}
            focusOn={this.focusOnGroup}
            focusOff={this.focusOffGroup}
            isFocused={isGroupFocus}
            isHover={isHover}
            handle={
              <span className="drag-icon"
                data-react-beautiful-dnd-drag-handle
                {...provided.dragHandleProps}><DragIndicator />
              </span>
            }
            group={group}
            funcs={funcs} />

          <TaskList
            boardId={boardId}
            groupId={group.id}
            funcs={funcs}
            taskList={group.tasks}
            borderStyle={{ borderLeft: `${styles.bgColor} 5px solid` }} />

          <div className="task-add" style={{ borderLeft: `${styles.bgColor} 5px solid` }} >

            <form className="task-add-form  flex align-center" onSubmit={this.onSubmit}>

              <input onChange={this.handleChange}
                className="task-add-input"
                value={this.state.title}
                placeholder=' +Add Task'
                type="text"
                spellCheck="false" />

              <button className='add-btn'>
                Add
              </button>
            </form>

          </div>

          <GroupProgressBar tasks={group.tasks} />
        </div>
      </section>
    );
  }
}
