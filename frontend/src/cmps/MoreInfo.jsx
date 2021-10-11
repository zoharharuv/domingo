import { Component } from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Button,
  Divider
} from '@material-ui/core';
import {
  MoreHoriz,
  ArrowDropDown,
  AddCircleOutline,
  FileCopyOutlined,
  CreateOutlined,
  ColorLensOutlined,
  DeleteOutlined,
  ArchiveOutlined,
  PersonAddOutlined,
  TrendingUpOutlined
} from '@material-ui/icons';

// icon = null, dots, arrow
// funcs = funcs from BoardApp
// items = [{title: 'bla..', icon: 'blaa..'}]
// location = boardId, groupId, taskId

// const open = if menu is open = true else false
export class MoreInfo extends Component {
  state = {
    anchorEl: null
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { icon, funcs, items, location } = this.props
    const { anchorEl } = this.state
    const isOpen = Boolean(anchorEl);
    return (
      <>
        <Button
          className={`more-info flex align-center more-info-btn ${isOpen ? 'open' : 'close'}`}
          id="info-button"
          aria-controls="info-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
          onClick={this.handleClick}>
          {
            {
              arrow: <ArrowDropDown />,
              dots: <MoreHoriz />,
            }[icon]
          }
        </Button>

        <Menu
          id="info-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          open={isOpen}
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "info-button",
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}>
          {items?.length &&
            items.map((item, idx) => (
              item.title === 'Divider' ? <Divider key={idx} /> :
                <MenuItem
                  className="flex center-center"
                  disableGutters
                  key={idx}
                  onClick={() => {
                    this.handleClose();
                    // SWITCH CASE FOR FUNCS
                    switch (item.title) {
                      // BOARD
                      case 'Rename board':
                        console.log('Rename board');
                        break;
                      case 'Duplicate board':
                        funcs.onAddBoard(location?.boardId);
                        break;
                      case 'Delete board':
                        funcs.onRemoveBoard(location?.boardId);
                        break;
                      // GROUP
                      case 'Rename group':
                        console.log('Rename group');
                        // focusOn()
                        break;
                      case 'Change group color':
                        console.log('Change group color');
                        break;
                      case 'Add group':
                        funcs.onAddGroup();
                        break;
                      case 'Duplicate group':
                        funcs.onAddGroup(location?.groupId);
                        break;
                      case 'Remove group':
                        funcs.onRemoveGroup(location?.groupId);
                        break;
                      // TASK
                      case 'Rename task':
                        console.log('Rename task');
                        break;
                      case 'Duplicate task':
                        funcs.onAddTask(location?.groupId, location?.taskId);
                        break;
                      case 'Create new task':
                        funcs.onAddTask(location?.groupId);
                        break;
                      case 'Remove task':
                        funcs.onRemoveTask(location?.groupId, location?.taskId);
                        break;
                      // MISC ACTIONS
                      case 'Board members':
                        funcs.onToggleMainModal({ component: 'InviteMembers' })
                        break;
                      case 'Board activity':
                        funcs.onToggleModal({ component: 'ActivityLog' })
                        break;
                      default:
                        break;
                    }
                  }}>

                  <ListItemIcon style={{ minWidth: '30px' }}>
                    {
                      {
                        'AddCircleOutline': <AddCircleOutline fontSize={'small'} />,
                        'FileCopyOutlined': <FileCopyOutlined fontSize={'small'} />,
                        'CreateOutlined': <CreateOutlined fontSize={'small'} />,
                        'ColorLensOutlined': <ColorLensOutlined fontSize={'small'} />,
                        'DeleteOutlined': <DeleteOutlined fontSize={'small'} />,
                        'ArchiveOutlined': <ArchiveOutlined fontSize={'small'} />,
                        'PersonAddOutlined': <PersonAddOutlined fontSize={'small'} />,
                        'TrendingUpOutlined': <TrendingUpOutlined fontSize={'small'} />,
                      }[item.icon]
                    }
                  </ListItemIcon>

                  <ListItemText>
                    {item.title}
                  </ListItemText>

                </MenuItem>
            ))}
        </Menu>
      </>
    );
  }
}
