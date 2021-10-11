import { Component } from 'react'
import { motion } from "framer-motion";
import { eventBusService } from '../services/event-bus.service'

export class UserMsg extends Component {
  state = {
    msg: null
  }
  removeEvent;

  componentDidMount() {
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 2000)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <span></span>
    const msgClass = this.state.msg.type || ''
    const popup = {
      hidden: {
        x: "-50vw",
        opacity: 0,
      },
      visible: {
        x: "10vw",
        opacity: 1,
        transition: {
          duration: 1,
          type: "spring",
          damping: 30,
          stiffness: 300,
        },
      },
      exit: {
        x: "-50vw",
        opacity: 0,
      },
    };
    return (
      <motion.div
        onClick={(ev) => ev.stopPropagation()}
        variants={popup}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`user-msg ${msgClass}`}>
        {this.state.msg.txt}
        <button onClick={() => {
          this.setState({ msg: null })
        }}><span className="close-btn abs">&times;</span></button>
      </motion.div>
    )
  }
}
