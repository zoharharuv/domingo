import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GroupPreview } from "./GroupPreview";
export function GroupList({ groupList, boardId, funcs}) {

  const handleDragEnd = (res) => {
    if (!res.destination) return;
    funcs.onReorder(res);
  };

  return groupList ? (
    <DragDropContext onDragEnd={handleDragEnd}>

      <Droppable type="group" droppableId="groups">

        {(provided) => (

          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="group-list flex column"
          >
            {groupList.map((group, index) => {
              return (
                <Draggable
                  key={group.id}
                  draggableId={group.id}
                  index={index}
                >
                  {(provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                      <GroupPreview
                        provided={provided}
                        boardId={boardId}
                        funcs={funcs}
                        key={group.id}
                        group={group}
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
    </DragDropContext>
  ) : (
    ""
  );
}
