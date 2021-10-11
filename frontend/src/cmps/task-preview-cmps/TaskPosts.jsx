import { Component } from "react";

export class TaskPosts extends Component {
  state = {
    comment: "",
  };

  handleChange = (ev) => {
    this.setState({
      comment: ev.target.value,
    });
  };

  render() {
    const { task, funcs, groupId, user } = this.props;
    const { comment } = this.state;
    return (
      <div className="task-posts flex column">
        <form className="flex column center-center" action="">
          <textarea
            onChange={this.handleChange}
            value={comment}
            name=""
            id=""
            cols="22"
            rows="4"
          ></textarea>
          <button
            onClick={(ev) => {
              ev.preventDefault();
              if (comment) {
                const updatedComment = `${user ? user?.username : "guest"
                  }:${comment}`;
                funcs.onPostComment(groupId, task.id, updatedComment);
              }
            }}
          >
            Post
          </button>
        </form>

        {task.comments.map((comment, idx) => (
          <div key={idx}>{comment}</div>
        ))}
      </div>
    );
  }
}
