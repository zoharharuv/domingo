import { Component } from "react";
import { connect } from "react-redux";
import { Menu, Button, Tooltip } from "@material-ui/core";
import { NotificationsOutlined } from "@material-ui/icons";
import { utilService } from "./../services/util.service";
import { Badge, Avatar } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";

class _Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    this.props.setOffNewNotification();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { notifications, isNewNotification } = this.props;
    const isOpen = Boolean(anchorEl);
    return (
      <section className="notifications">
        <Button
          className={`notifications-btn flex align-center ${
            isOpen ? "open" : "close"
          }`}
          id="info-button"
          aria-controls="notifs-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
          onClick={this.handleClick}
        >
          <span
            className={`notif-num ${isNewNotification ? 'new' : ''}`}>
            {notifications.length || ""}
          </span>

          <Tooltip
            title={<h2 className="tool-tip">Notifications</h2>}
            placement="right"
          >
            <NotificationsOutlined
              style={{
                color: "white",
                fontSize: "30px",
              }}
            />
          </Tooltip>
        </Button>

        <Menu
          PaperProps={{
            style: {
              display: "flex",
              maxHeight: 290,
            },
          }}
          id="info-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          open={isOpen}
          onClose={this.handleClose}
          MenuListProps={{
            "aria-labelledby": "info-button",
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <div className="notifications-container flex column">
            {notifications.length
              ? notifications.map((notification, idx) => (
                  <div key={idx} className="notification-container">
                    <div className="notification-item-content flex gap align-center">
                      <Badge overlap="circular" variant="dot">
                        <Avatar
                          style={{ width: 30, height: 30 }}
                          alt={notification.byMember.fullname.slice(0, 1)}
                          src={notification.byMember.imgUrl}
                        >
                          {notification.byMember.fullname.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </Badge>

                      <span className="notification-txt">
                        <small>{notification.info}</small>
                      </span>

                      <div className="time-added flex align-center">
                        <AccessTime
                          style={{
                            color: "lightgray",
                            width: 14,
                            transform: "translateY(1px)",
                          }}
                        />
                        <span className="notification-time">
                          <small>
                            {utilService.timeSince(notification.createdAt)}
                          </small>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : `No Notifications Yet...`}
          </div>
        </Menu>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Notifications);
