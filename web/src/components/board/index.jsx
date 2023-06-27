import {
  ContainerColumns,
  Column,
  TitleColumn,
  CountColumn,
  Card,
  TitleCard,
  DescriptionCard,
  ContainerActions,
  ContainerCards,
  ContainerIcon,
} from "./styles";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllColumns } from "../../services/api/column";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import http from "../../services/http";
import { DivRow } from "../../pages/kanban/styles";
import { useState } from "react";
import Modal from "../modal";
import FormDeleteColumn from "../forms/formDeleteColumn";

export default function Board() {
  const [modal, setModal] = useState();
  const columns = useQuery({
    queryKey: ["columns"],
    queryFn: getAllColumns,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const client = useQueryClient();

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination.droppableId) {
      return;
    }

    client.setQueryData({ queryKey: ["columns"] }, (prev) => {
      let old = prev;

      let oldColumn = old.find((x) => x.id === parseInt(source.droppableId));

      let item = oldColumn.tasks.splice(source.index, 1)[0];

      let destinationColumn = old.find(
        (x) => x.id === parseInt(destination.droppableId)
      );

      destinationColumn.tasks.splice(destination.index, 0, item);

      item.status = destinationColumn.id;

      return old;
    });

    http.patch(`/tasks/${draggableId}`, {
      status: destination.droppableId,
      column: destination.droppableId,
    });
  }

  return (
    <>
      <ContainerColumns>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns?.data?.map((column) => {
            return (
              <Droppable droppableId={`${column?.id}`} key={column?.id}>
                {(provided) => (
                  <Column>
                    <DivRow>
                      <TitleColumn>
                        {column?.name}{" "}
                        <CountColumn>{column?.tasks?.length}</CountColumn>
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
                      border={column.tasks?.length > 0}
                    >
                      {column?.tasks?.map((task, index) => {
                        return (
                          <Draggable
                            draggableId={`${task.id}`}
                            key={`${task.id}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <TitleCard>{task.name}</TitleCard>
                                <DescriptionCard>
                                  {task.description}
                                </DescriptionCard>
                                <ContainerActions>
                                  <BiEditAlt size={20} color="red" />
                                  <BsTrash size={17} color="red" />
                                </ContainerActions>
                                {provided.placeholder}
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ContainerCards>
                  </Column>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </ContainerColumns>
      {modal?.name === "deleteColumn" && (
        <Modal setModal={setModal}>
          <FormDeleteColumn data={modal.data} setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
