import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskPreview } from "./TaskPreview";
export function TaskList({ taskList, groupId, funcs, borderStyle, boardId }) {

  return taskList ? (
    <Droppable type='task' droppableId={groupId}>
      {(provided) => (
        <section
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="task-list"
        >
          {taskList.map((task, index) => {
            return (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    data-react-beautiful-dnd-drag-handle
                  >
                    <TaskPreview
                      index={index}
                      boardId={boardId}
                      groupId={groupId}
                      funcs={funcs}
                      key={task.id}
                      task={task}
                      borderStyle={borderStyle}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  ) : (
    ""
  );
}
