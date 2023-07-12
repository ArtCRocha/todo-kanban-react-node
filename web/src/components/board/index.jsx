import { ContainerColumns } from "./styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllColumns } from "../../services/api/column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import http from "../../services/http";
import { useState } from "react";
import Modal from "../modal";
import FormDeleteColumn from "../forms/formDeleteColumn";
import ColumnComponent from "./column";

let movedItem;
let overItem;
let sourceCol;
let destinationCol;
let order;
export default function Board() {
  const [modal, setModal] = useState();
  const columns = useQuery({
    queryKey: ["columns"],
    queryFn: getAllColumns,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const client = useQueryClient();

  async function onDragEnd(result) {
    const { source, destination, draggableId, type } = result;

    if (!destination.droppableId) {
      return;
    }

    if (type === "columns") {
      client.setQueryData({ queryKey: ["columns"] }, (prev) => {
        let old = prev;

        sourceCol = old[source.index];
        destinationCol = old[destination.index];

        let sourceColOrder = sourceCol?.order;

        sourceCol.order = destinationCol.order;
        destinationCol.order = sourceColOrder;

        old[source.index] = destinationCol;
        old[destination.index] = sourceCol;

        order = old[destination.index].order;

        return old;
      });

      try {
        await http.patch(`/columns/order/${draggableId}/`, {
          order: order,
        });
      } catch {
        console.log("Error");
      }
    }

    if (type === "tasks") {
      if (source.droppableId !== destination.droppableId) {
        client.setQueryData(
          { queryKey: ["tasks", parseInt(source.droppableId)] },
          (prev) => {
            let old = prev;
            movedItem = old.splice(source.index, 1)[0];
            return old;
          }
        );
      }

      client.setQueryData(
        { queryKey: ["tasks", parseInt(destination.droppableId)] },
        (prev) => {
          let old = prev;

          if (movedItem) {
            movedItem.status = destination.droppableId;

            
            old.splice(destination.index, 0, movedItem);

            movedItem = "";

            console.log(old);
          } else {
            let sourceTask = old[source.index];
            let destinationTask = old[destination.index];

            let sourceTaskOrder = sourceTask?.order;

            sourceTask.order = destinationTask.order;
            destinationTask.order = sourceTaskOrder;

            old[source.index] = destinationTask;
            old[destination.index] = sourceTask;

            order = old[destination.index].order;

            console.log(old);
          }

          return old;
        }
      );

      http.patch(`/tasks/${draggableId}`, {
        status: destination.droppableId,
        column: destination.droppableId,
        order: order,
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
