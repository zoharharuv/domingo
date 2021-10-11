import { Component } from "react";
import { motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import { InviteMembers } from "./InviteMembers";
import { Close } from '@material-ui/icons';


export class MainModal extends Component {

  render() {
    const newspaper = {
      hidden: {
        y: "0",
        opacity: 0,
      },
      visible: {
        y: "0",
        opacity: 1,
        transition: {
          duration: 0.1,
          type: "modal",
        },
      },
      exit: {
        y: "0",
        opacity: 0,
      },
    };

    const { funcs, data, handleClose } = this.props;
    return (
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(ev) => ev.stopPropagation()}
          className="main-modal"
          variants={newspaper}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button className="main-modal-close" onClick={handleClose}>
            <Close />
          </button>
          {
            {
              InviteMembers: <InviteMembers funcs={funcs} />,
            }[data.component]
          }
        </motion.div>
      </Backdrop>
    );
  }
}
