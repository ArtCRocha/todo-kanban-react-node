import { ContainerColumns } from "./styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllColumns } from "../../services/api/column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import http from "../../services/http";
import { useState } from "react";
import Modal from "../modal";
import FormDeleteColumn from "../forms/formDeleteColumn";
import ColumnComponent from "./column";

let movedItem = "";
let overItem = "";
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
    const { source, destination, draggableId, type } = result;

    if (!destination.droppableId) {
      return;
    }

    if (type === "columns") {
      console.log(result);
    }

    if (type === "tasks") {
      // verificar se são colunas diferentes
      client.setQueryData(
        { queryKey: ["tasks", parseInt(source.droppableId)] },
        (prev) => {
          let old = prev;
          movedItem = old.splice(source.index, 1)[0];
          return old;
        }
      );

      if (movedItem) {
        client.setQueryData(
          { queryKey: ["tasks", parseInt(destination.droppableId)] },
          (prev) => {
            let old = prev;

            movedItem.status = destination.droppableId;
            old.splice(destination.index, 0, movedItem);

            overItem = old[source.index];

            if (source.draggableId === destination.draggableId) {
              let actualOrderMovedItem = movedItem.order;
              let actualOrderOverItem = overItem.order;

              old[source.index].order = actualOrderMovedItem;
              old[destination.index].order = actualOrderOverItem;
            }

            return old;
          }
        );
      }

      // Mandar id do overItem pelo endpoint e mudar a order do overItem para a order do movedItem na api
      http.patch(`/tasks/${draggableId}`, {
        status: destination.droppableId,
        column: destination.droppableId,
      });
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="columns">
          {(provided) => (
            <ContainerColumns
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.data?.map((column, index) => {
                return (
                  <ColumnComponent key={index} column={column} index={index} />
                );
              })}
              {provided.placeholder}
            </ContainerColumns>
          )}
        </Droppable>
      </DragDropContext>
      {modal?.name === "deleteColumn" && (
        <Modal setModal={setModal}>
          <FormDeleteColumn data={modal.data} setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
