import { Component } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { BoardNav } from "./../cmps/BoardNav";
import { BoardContainer } from "../cmps/BoardContainer";
import { Loader } from "./../cmps/Loader";
import { BoardAside } from "../cmps/BoardAside";
import { SideModal } from "../cmps/SideModal";
import { MainModal } from "./../cmps/MainModal";
import { UserMsg } from "./../cmps/UserMsg";

import {
  //
  filter,
  //board
  updateBoard,
  loadBoard,
  addBoard,
  editBoard,
  removeBoard,
  addUserToBoard,
  removeUserFromBoard,
  //group
  reorderGroups,
  addGroup,
  removeGroup,
  editGroup,
  //task
  addTask,
  removeTask,
  editTask,
  addComment,
  changeStatus,
  changePriority,
  addStatus,
  addPriority,
  removeStatusPriority,
  reorderTasks,
  switchTasks,
  reorderStatusPriority,
  updateStatusPriority,
  addMemberToTask,
  removeMemberFromTask,
} from "./../store/actions/board.actions";

import {
  //modal
  setModalData,
  toggleModal,
  toggleMainModal,
} from "./../store/actions/system.actions";

import {
  //user
  loadUsers,
  onLogout,
  loginGuest,
} from "./../store/actions/user.actions";
import { showErrorMsg } from "../services/event-bus.service";

class _BoardApp extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.loginGuest();
    }
    this.props.loadUsers();
    const id = this.props.match.params.boardId;
    this.onLoadBoard(id);
  }


  // GENERAL FUNCS
  onFilter = async (filterBy) => {
    const boardToShow = JSON.parse(
      JSON.stringify(
        this.props.boards.find((board) => board._id === this.props.board._id)
      )
    );

    if (filterBy.name) {
      //get the groups that contains the relevant search
      const reg = RegExp(filterBy.name, 'i')
      boardToShow.groups = boardToShow.groups.filter((group) =>
        group.tasks.some((task) =>
          // task.title.toLowerCase().includes(filterBy.name.toLowerCase())
          reg.test(task.title)
        )
      );

      //filter out the tasks not contain the search
      boardToShow.groups.forEach((group) => {
        group.tasks = group.tasks.filter((task) =>
          // task.title.toLowerCase().includes(filterBy.name.toLowerCase())
          reg.test(task.title)
        );
      });
    }

    if (filterBy.member) {
      //getting back the groups that their tasks list contains a task with at list one mention of the searched member
      boardToShow.groups = boardToShow.groups.filter((group) =>
        group.tasks.some((task) =>
          task.members.some((member) => member.fullname === filterBy.member)
        )
      );

      //filter out the tasks not contain the member
      boardToShow.groups.forEach((group) => {
        group.tasks = group.tasks.filter((task) =>
          task.members.some((member) => member.fullname === filterBy.member)
        );
      });
    }

    if (filterBy.group) {
      boardToShow.groups = boardToShow.groups.filter(group => group.id === filterBy.group)
    }

    if (filterBy.status) {
      const reg = RegExp(filterBy.status, 'i')
      boardToShow.groups = boardToShow.groups.filter((group) =>
        group.tasks.some((task) =>
          // task.status.title.toLowerCase().includes(filterBy.status.toLowerCase())
          reg.test(task.status.title)
        )
      );

      boardToShow.groups.forEach((group) => {
        group.tasks = group.tasks.filter((task) =>
          // task.status.title.toLowerCase().includes(filterBy.status.toLowerCase())
          reg.test(task.status.title)
        );
      });

    }

    if (filterBy.priority) {
      const reg = RegExp(filterBy.priority, 'i')
      boardToShow.groups = boardToShow.groups.filter((group) =>
        group.tasks.some((task) =>
          // task.priority.title.toLowerCase().includes(filterBy.priority.toLowerCase())
          reg.test(task.priority.title)
        )
      );

      boardToShow.groups.forEach((group) => {
        group.tasks = group.tasks.filter((task) =>
          // task.priority.title.toLowerCase().includes(filterBy.priority.toLowerCase())
          reg.test(task.priority.title)
        );
      });

    }

    this.props.filter(boardToShow);
  };

  onToggleModal = (modalData = null) => {
    if (modalData) this.props.setModalData(modalData);
    this.props.toggleModal();
  };

  onToggleMainModal = (modalData = null) => {
    if (modalData) this.props.setModalData(modalData);
    this.props.toggleMainModal();
  };

  onLogout = () => {
    this.props.onLogout();
    this.props.history.push("/");
  };

  //BOARD CRUD
  onUpdateBoard = (board) => {
    this.props.updateBoard(board)
  }

  onLoadBoard = async (id, filterBy = null) => {
    this.props.history.push(`/board/${id}`);
    try {
      const board = await this.props.loadBoard(id, filterBy);
      if (!board) this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  onAddBoard = async (boardId = null) => {
    try {
      await this.props.addBoard(boardId);
    } catch (err) {
      console.log(err);
    }
  };

  onEditBoard = async (updatedField, boardId = null) => {
    try {
      // updatedField = DYNAMIC OBJECT
      const { _id } = boardId || this.props.board;
      this.props.editBoard(_id, updatedField);
    } catch (err) {
      console.log(err);
    }
  };

  onRemoveBoard = async (boardId) => {
    try {
      if(this.props.boards.length > 1){
        await this.props.removeBoard(boardId);
        const id = this.props.match.params.boardId;
        if (id === boardId) this.props.history.push(`/`);
      }else{
        showErrorMsg('Must have atleast one board')
      }
    } catch (err) {
      console.log(err);
    }
  };

  // BOARD USER FUNCS
  onAddUserToBoard = async (user) => {
    try {
      const boardId = this.props.match.params.boardId;
      await this.props.addUserToBoard(boardId, user);
    } catch (err) {
      console.log(err);
    }
  };

  onRemoveUserFromBoard = async (userId) => {
    try {
      const boardId = this.props.match.params.boardId;
      await this.props.removeUserFromBoard(boardId, userId);
    } catch (err) {
      console.log(err);
    }
  };

  // REORDER DND
  onReorder = (res) => {
    //empty arg groupId = null
    const { destination, source, type } = res;
    //empty destruc draggableId = null

    if (type === "group") {
      const groupList = this.props.board.groups;
      //new array
      const newGroups = Array.from(groupList);
      //splicing out the dragged toy
      const [reorderedGroup] = newGroups.splice(res.source.index, 1);
      //inserts the toy to the destination
      newGroups.splice(res.destination.index, 0, reorderedGroup);

      this.onGroupsReordered(newGroups);
    } else {
      //the same groups
      if (destination.droppableId === source.droppableId) {
        const groupId = res.source.droppableId;

        const group = this.props.board.groups.find(
          (group) => group.id === groupId
        );

        //new array
        const newTasks = Array.from(group.tasks);
        //splicing out the dragged toy
        const [reorderedTask] = newTasks.splice(res.source.index, 1);
        //inserts the toy to the destination
        newTasks.splice(res.destination.index, 0, reorderedTask);

        this.onTasksReordered(groupId, newTasks);

        //diffrent group!
      } else {
        const { _id } = this.props.board;

        const sourceGroupId = res.source.droppableId;
        const destinationGroupId = res.destination.droppableId;

        const sourceGroup = this.props.board.groups.find(
          (group) => group.id === sourceGroupId
        );

        const destinationGroup = this.props.board.groups.find(
          (group) => group.id === destinationGroupId
        );

        const newSourceTasks = [...sourceGroup.tasks];
        const newDestinationTasks = [...destinationGroup.tasks];

        const [reorderedTask] = newSourceTasks.splice(res.source.index, 1);
        newDestinationTasks.splice(res.destination.index, 0, reorderedTask);

        this.onTasksSwitched(
          _id,
          sourceGroupId,
          newSourceTasks,
          destinationGroupId,
          newDestinationTasks
        );
      }
    }
  };

  onTasksSwitched = (
    boardId,
    sourceGroupId,
    newSourceTasks,
    destinationGroupId,
    newDestinationTasks
  ) => {
    this.props.board.groups.find((group) => group.id === sourceGroupId).tasks =
      newSourceTasks;

    this.props.board.groups.find(
      (group) => group.id === destinationGroupId
    ).tasks = newDestinationTasks;

    const updateBoard = JSON.parse(JSON.stringify(this.props.board));

    this.props.switchTasks(updateBoard);
  };

  //GROUP CRUD
  onGroupsReordered = (groupList) => {
    // this.props.reorderGroups(_id, groupList);
    this.props.board.groups = groupList;
    const updateBoard = JSON.parse(JSON.stringify(this.props.board));
    this.props.reorderGroups(updateBoard);
  };
  onAddGroup = (groupId = null) => {
    const { _id } = this.props.board;
    this.props.addGroup(_id, groupId);
  };

  onEditGroup = (groupId, updatedField) => {
    const { _id } = this.props.board;
    this.props.editGroup(_id, groupId, updatedField);
  };

  onRemoveGroup = (groupId) => {
    const { _id } = this.props.board;
    this.props.removeGroup(_id, groupId);
  };

  //TASK CRUD
  onStatus = (groupId, taskId, status) => {
    const { _id } = this.props.board;
    this.props.changeStatus(_id, groupId, taskId, status);
  };

  onPriority = (groupId, taskId, priority) => {
    const { _id } = this.props.board;
    this.props.changePriority(_id, groupId, taskId, priority);
  };

  onPostComment = (groupId, taskId, comment) => {
    const { _id } = this.props.board;
    const newComment = {
      txt: `${comment}`,
      createdAt: Date.now(),
      byMember: {
        _id: `${this.props.user._id}`,
        fullname: `${this.props.user.fullname}`,
        imgUrl: `${this.props.user.imgUrl}`,
      },
    };

    this.props.addComment(_id, groupId, taskId, newComment);
  };

  onAddTask = (groupId, taskId = null, title = "") => {
    const { _id } = this.props.board;
    this.props.addTask(_id, groupId, taskId, title);
  };

  onRemoveTask = (groupId, taskId) => {
    const { _id } = this.props.board;
    this.props.removeTask(_id, groupId, taskId);
  };

  onEditTask = (groupId, taskId, updatedField) => {
    const { _id } = this.props.board;
    this.props.editTask(_id, groupId, taskId, updatedField);
  };

  onAddStatus = (status) => {
    const { _id } = this.props.board;
    this.props.addStatus(_id, status);
  };

  onAddPriority = (priority) => {
    const { _id } = this.props.board;
    this.props.addPriority(_id, priority);
  };

  onRemoveStatusPriority = (type, id) => {
    const { _id } = this.props.board;
    this.props.removeStatusPriority(_id, type, id);
  };

  onTasksReordered = (groupId, taskList) => {
    this.props.board.groups.find((group) => group.id === groupId).tasks =
      taskList;

    const updateBoard = JSON.parse(JSON.stringify(this.props.board));

    this.props.reorderTasks(updateBoard);
  };

  onStatusPriorityReordered = (type, entity) => {
    if (type === "status") this.props.board.statuses = entity;
    else this.props.board.priorities = entity;

    const updateBoard = JSON.parse(JSON.stringify(this.props.board));

    this.props.reorderStatusPriority(updateBoard);
  };

  onUpdateStatusPriority = (type, updatedEntity) => {
    const { _id } = this.props.board;
    this.props.updateStatusPriority(_id, type, updatedEntity);
  };

  // TASK USER FUNCS
  onAddMemberToTask = (groupId, taskId, member) => {
    const { _id } = this.props.board;
    this.props.addMemberToTask(_id, groupId, taskId, member);
  };

  onRemoveMemberFromTask = (groupId, taskId, memberId) => {
    const { _id } = this.props.board;
    this.props.removeMemberFromTask(_id, groupId, taskId, memberId);
  };

  //CRUD FUNCS object
  funcs = {
    onToggleModal: this.onToggleModal,
    onToggleMainModal: this.onToggleMainModal,
    onFilter: this.onFilter,
    // BOARD
    onUpdateBoard: this.onUpdateBoard,
    onLoadBoard: this.onLoadBoard,
    onAddBoard: this.onAddBoard,
    onEditBoard: this.onEditBoard,
    onRemoveBoard: this.onRemoveBoard,
    onReorder: this.onReorder,
    // BOARD USER FUNCS
    onAddUserToBoard: this.onAddUserToBoard,
    onRemoveUserFromBoard: this.onRemoveUserFromBoard,
    // GROUP
    onGroupsReordered: this.onGroupsReordered,
    onAddGroup: this.onAddGroup,
    onRemoveGroup: this.onRemoveGroup,
    onEditGroup: this.onEditGroup,
    // TASK
    onAddTask: this.onAddTask,
    onRemoveTask: this.onRemoveTask,
    onEditTask: this.onEditTask,
    onPostComment: this.onPostComment,
    onStatus: this.onStatus,
    onPriority: this.onPriority,
    onAddStatus: this.onAddStatus,
    onAddPriority: this.onAddPriority,
    onRemoveStatusPriority: this.onRemoveStatusPriority,
    onTasksReordered: this.onTasksReordered,
    onStatusPriorityReordered: this.onStatusPriorityReordered,
    onUpdateStatusPriority: this.onUpdateStatusPriority,
    // TASK USER FUNCS
    onAddMemberToTask: this.onAddMemberToTask,
    onRemoveMemberFromTask: this.onRemoveMemberFromTask,
  };

  render() {
    const { board, user, loader, modal, mainModal, modalData } = this.props;

    return (
      <section className="board-app">
        <BoardNav history={this.props.history} board={board} user={user} onLogout={this.onLogout} />
        <BoardAside funcs={this.funcs} />

        {loader ? (
          <Loader />
        ) : (
          <BoardContainer funcs={this.funcs} board={board} />
      )}
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {modal && (


            <SideModal
              funcs={this.funcs}
              data={modalData}
              handleClose={this.onToggleModal}
            />

          )}
          {mainModal && (
            <MainModal
              funcs={this.funcs}
              data={modalData}
              handleClose={this.onToggleMainModal}
            />
          )}
        </AnimatePresence>

        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}>
          <UserMsg />
        </AnimatePresence>
      </section >
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.systemModule.loader,
    modal: state.systemModule.modal,
    mainModal: state.systemModule.mainModal,
    user: state.userModule.user,
    board: state.boardModule.board,
    boards: state.boardModule.boards,
    modalData: state.systemModule.modalData,
  };
}
const mapDispatchToProps = {
  //
  filter,
  //user
  loadUsers,
  onLogout,
  loginGuest,
  //modal
  setModalData,
  toggleModal,
  toggleMainModal,
  //board
  updateBoard,
  loadBoard,
  addBoard,
  editBoard,
  removeBoard,
  addUserToBoard,
  removeUserFromBoard,
  //group
  reorderGroups,
  addGroup,
  removeGroup,
  editGroup,
  //task
  addTask,
  removeTask,
  editTask,
  changeStatus,
  changePriority,
  addStatus,
  addPriority,
  removeStatusPriority,
  reorderTasks,
  switchTasks,
  reorderStatusPriority,
  updateStatusPriority,
  addComment,
  addMemberToTask,
  removeMemberFromTask,
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
