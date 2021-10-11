import { Component } from "react";
import likeIcon from '../../assets/imgs/svg/like.svg'
import likeIconFilled from '../../assets/imgs/like.png'
import { Reply } from '@material-ui/icons'

export class CommentOptions extends Component {
  state = {
    isLike: false
  }

  toggleLike = () => {
    const { isLike } = this.state
    this.setState({
      isLike: !isLike
    })
  }

  render() {
    return <div className='like-replay-container flex'
    >
      <div style={{ color: this.state.isLike ? '#0073EA' : '#323338' }} className="like-btn-container flex center-center">
        <button onClick={this.toggleLike} className="like-btn flex center-center">

          {!this.state.isLike ?
            <img className='like-unfilled' style={{
              width: 18,
              height: 18,
            }} src={likeIcon} alt="" />
            :
            <img className='like-filled' style={{
              width: 14,
              height: 14,
              paddingInlineEnd: '2px',
              color: 'blue',
              filter: `invert(39%) sepia(83%) saturate(4330%) hue-rotate(196deg) brightness(93%) contrast(103%)`
            }} src={likeIconFilled} alt="" />
          }

          <span>
            Like
          </span>

        </button>
      </div>

      <div className="reply-btn-container flex center-center">
        <button className="reply-btn flex center-center">
          <Reply
          style={{
            
          }}
           />
          <span>
            Reply
          </span>
        </button>
      </div>

    </div>
  }
}


