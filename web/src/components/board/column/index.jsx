import { Draggable, Droppable } from "react-beautiful-dnd";
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
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../../../services/api/tasks";
import { useState } from "react";
import Modal from "../../modal";
import FormDeleteColumn from "../../forms/formDeleteColumn";

export default function ColumnComponent({ column, index }) {
  const [modal, setModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["tasks", column?.id],
    queryFn: getAllTasks,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return (
    <>
      <Draggable
        key={`${column?.id}`}
        draggableId={`${column?.id}`}
        index={index}
      >
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable
              key={`${column?.id}`}
              droppableId={`${column?.id}`}
              index={index}
              type="tasks"
            >
              {(provided) => (
                <Column>
                  <DivRow>
                    <TitleColumn>
                      {column?.name} <CountColumn>{data?.length}</CountColumn>
                    </TitleColumn>
                    <ContainerIcon
                      onClick={() =>
                        setModal({ name: "deleteColumn", data: column })
                      }
                    >
                      <BsTrash size={17} color="red" />
                    </ContainerIcon>
                  </DivRow>
                  <ContainerCards
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    border={data?.length > 0}
                  >
                    {data?.map((task, index) => {
                      return <TaskComponent task={task} index={index} />;
                    })}
                    {provided.placeholder}
                  </ContainerCards>
                </Column>
              )}
            </Droppable>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      {modal?.name === "deleteColumn" && (
        <Modal setModal={setModal}>
          <FormDeleteColumn data={modal?.data} setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
