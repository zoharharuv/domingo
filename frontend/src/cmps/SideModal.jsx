import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { motion } from "framer-motion";
import { Tooltip } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import { Backdrop } from "./Backdrop";
import { TaskDetails } from "./task-preview-cmps/TaskDetails";
import { ActivityLog } from "./ActivityLog";


class _SideModal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModal, false);
  }

  closeModal = ({ key }) => {
    if (key === "Escape") {
      this.props.handleClose();
    }
  };

  render() {
    const dropIn = {
      hidden: {
        x: "700px",
        opacity: 0,
      },
      visible: {
        x: "0",
        opacity: 1,
        transition: {
          duration: 0.2,
          type: "modal",
          damping: 20,
          stiffness: 300,
        },
      },
      exit: {
        x: "700px",
        opacity: 0,
      },
    };
    const { funcs, data, handleClose, user } = this.props;
    return (

      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(ev) => ev.stopPropagation()}
          className="side-modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Tooltip
            arrow
            title={<h2 className="header-tool-tip">ESC</h2>}
            placement="left"
          >
            <button className="side-modal-close" onClick={handleClose}>
              <Close />
            </button>
          </Tooltip>
          {
            {
              TaskDetails: (
                <TaskDetails
                  user={user}
                  groupId={data.groupId}
                  task={data.task}
                  funcs={funcs}
                />
              ),
              ActivityLog: <ActivityLog funcs={funcs} />,
            }[data.component]
          }
        </motion.div>
      </Backdrop>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {};

export const SideModal = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_SideModal)
);
