import { Component } from 'react';
import { ColorPicker } from './task-preview-cmps/ColorPicker';
export class GroupHeader extends Component {
  state = {
    title: '',
  };

  componentDidMount() {
    this.setState({ title: this.props.group.title });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.group.title !== this.props.group.title)
      this.setState({ title: this.props.group.title });
  }

  handleChange = (ev) => {
    const title = ev.target.value;
    this.setState({ title });
  };

  onInputBlur = (ev = null) => {
    const { isHover, focusOff, group, funcs } = this.props
    const { title } = this.state
    if (isHover && ev) return;
    focusOff();
    funcs.onEditGroup(group.id, { title });
  }


  render() {
    const { group, handle, funcs, isFocused, toggleHover } =
      this.props;
    const { title } = this.state
    funcs.onInputBlur = this.onInputBlur
    return (
      <section
        style={{ color: group.style.bgColor }}
        className="group-header align-center space-between flex"
      >
        <div
          className={`group-header-left flex align-center gap ${isFocused ? "focus" : ""
            }`}
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
        >
          {handle}
          {!isFocused ? (
            <span onClick={this.props.focusOn} className="group-title">
              {title}
            </span>
          ) : (
            <>
              <ColorPicker
                toggleHover={toggleHover}
                group={group}
                funcs={funcs}
              />
              <form onSubmit={(ev) => {
                ev.preventDefault()
                this.onInputBlur(ev)
              }}>
                <input
                  className="group-title input"
                  type="text"
                  spellCheck="false"
                  autoFocus
                  value={title}
                  onChange={this.handleChange}
                  onBlur={(ev) => this.onInputBlur(ev)}
                ></input>
              </form>
            </>
          )}
        </div>

        <div className="group-header-right flex">
          <div className="test">
            <span >Members</span>
          </div>
          <div className="test">
            <span >Date</span>
          </div>
          <div>
            <span>Status</span>
          </div>
          <div>
            <span>Priority</span>
          </div>
        </div>
      </section>
    );
  }
}
