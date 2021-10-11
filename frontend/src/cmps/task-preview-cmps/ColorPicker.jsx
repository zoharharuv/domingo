import { Component } from "react";
import { connect } from "react-redux";
import { MenuItem, Menu } from "@material-ui/core";
import { utilService } from './../../services/util.service';

class _ColorPicker extends Component {
  state = {
    anchorEl: null,
  };

  onColor = (color) => {
    const { id } = this.props.group;
    this.props.funcs.onInputBlur()

    const updatedField = {
      bgColor: color.bgColor,
    };

    this.props.funcs.onEditGroup(id, updatedField);

    this.handleClose();
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const { group } = this.props;
    const colors = utilService.getLabelColors()
    
    return (
      <>
        <span className={`color-cont ${open ? "open" : "close"}`}>

          <span
            className={`color-circle ${open ? "open" : "close"
              }`}
            id="info-button"
            aria-controls="info-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={this.handleClick}
            style={{ backgroundColor: group.style.bgColor }}></span>
        </span>

        <Menu
          PaperProps={{
            style: {
              width: 140,
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
        >
          <div className="color-picker-container">
            {colors.map((color, idx) => {
              return (
                <div key={idx} className="color-cont">
                  <div
                    onClick={() => {
                      this.props.toggleHover(false)
                      this.onColor(color);
                    }}
                    style={{ backgroundColor: color.bgColor }}
                    className="color-circle"
                  >
                    <MenuItem />
                  </div>
                </div>
              );
            })}
          </div>
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

export const ColorPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ColorPicker);
