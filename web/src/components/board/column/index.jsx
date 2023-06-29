import { Droppable } from "react-beautiful-dnd";
import {
  Column,
  ContainerCards,
  ContainerIcon,
  CountColumn,
  TitleColumn,
} from "../styles";
import { DivRow } from "../../../pages/kanban/styles";
import { BsTrash } from "react-icons/bs";
import TaskComponent from "../task";

export default function ColumnComponent({
  column,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <Droppable droppableId={`${column?.id}`}>
      {(provided) => (
        <Column
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          draggable
        >
          <DivRow>
            <TitleColumn>
              {column?.name} <CountColumn>{column?.tasks?.length}</CountColumn>
            </TitleColumn>
            <ContainerIcon
              onClick={() => setModal({ name: "deleteColumn", data: column })}
            >
              <BsTrash size={17} color="red" />
            </ContainerIcon>
          </DivRow>
          <ContainerCards
            ref={provided.innerRef}
            {...provided.droppableProps}
            border={column.tasks?.length > 0}
          >
            {column?.tasks?.map((task, index) => {
              return <TaskComponent task={task} index={index} />;
            })}
            {provided.placeholder}
          </ContainerCards>
        </Column>
      )}
    </Droppable>
  );
}
