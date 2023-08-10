import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  ContainerActions,
  ContainerIcon,
  ContainerText,
  DescriptionCard,
  TitleCard,
} from "../styles";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash, BsTrash3 } from "react-icons/bs";
import { useState } from "react";
import Modal from "../../modal";
import FormDeleteTask from "../../forms/formDeleteTask";
import FormEditTask from "../../forms/formEditTask";
import TaskDetail from "../../taskDetail";

export default function TaskComponent({ task, index }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}>
        {(provided) => (
          <Card
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <ContainerText>
              <TitleCard onClick={() => setModal("taskDetail")}>
                {task.name}
              </TitleCard>
            </ContainerText>
            <ContainerActions>
              <ContainerIcon>
                <BiEditAlt
                  size={20}
                  color="red"
                  onClick={() => setModal("edit")}
                />
              </ContainerIcon>
              <ContainerIcon>
                <BsTrash3
                  size={17}
                  color="#dc3545"
                  onClick={() => setModal("delete")}
                />
              </ContainerIcon>
            </ContainerActions>
            {provided.placeholder}
          </Card>
        )}
      </Draggable>
      {modal === "delete" && (
        <Modal setModal={setModal}>
          <FormDeleteTask task={task} setModal={setModal} />
        </Modal>
      )}
      {modal === "edit" && (
        <Modal setModal={setModal}>
          <FormEditTask task={task} setModal={setModal} />
        </Modal>
      )}
      {modal === "taskDetail" && (
        <Modal setModal={setModal}>
          <TaskDetail task={task} setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
