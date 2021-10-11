import { Component } from "react";
import { Loader } from "./Loader";
import { BoardHeader } from "./BoardHeader";
import { GroupList } from "./GroupList";
import { Dashboard } from "./Dashboard";
import { socketService } from "../services/socket.service";
export class BoardContainer extends Component {
  state = {
    isDashboard: false,
  };

  componentDidMount() {
    socketService.emit("connect to board", this.props.board?._id);
    socketService.on("board updated", (board) => {
      //only for now!
      if (board?._id === this.props?.board?._id) {
        this.props.funcs.onUpdateBoard(board);
      }
    });
  }

  componentWillUnmount() {
    socketService.off("board updated");
  } 

  setContainerView = (val) => {
    this.setState({ isDashboard: val });
  };

  render() {
    const { board, funcs } = this.props;
    const { isDashboard } = this.state;
    return (
      <section className="board-container">
        {!board ? (
          <Loader />
        ) : (
          <>
            <BoardHeader
              funcs={funcs}
              setContainerView={this.setContainerView}
              isDashboard={isDashboard}
            />
            {!isDashboard ? (
              <GroupList
                boardId={board._id}
                funcs={funcs}
                groupList={board.groups}
              />
            ) : (
              <Dashboard board={board} />
            )}
          </>
        )}
      </section>
    );
  }
}
