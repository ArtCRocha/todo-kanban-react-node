import { Draggable } from "react-beautiful-dnd";
import { Card, ContainerActions, DescriptionCard, TitleCard } from "../styles";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

export default function TaskComponent({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}>
      {(provided) => (
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <TitleCard>{task.name}</TitleCard>
          <DescriptionCard>{task.description}</DescriptionCard>
          <ContainerActions>
            <BiEditAlt size={20} color="red" />
            <BsTrash size={17} color="red" />
          </ContainerActions>
          {provided.placeholder}
        </Card>
      )}
    </Draggable>
  );
}
