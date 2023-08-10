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
let newColumnOrder;
export default function Board() {
  const [modal, setModal] = useState();
  const columns = useQuery({
    queryKey: ["columns"],
    queryFn: getAllColumns,
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

        movedItem = old.splice(source.index, 1)[0];

        old.splice(destination.index, 0, movedItem);

        newColumnOrder = old;

        return old;
      });

      try {
        await http.post(`/columns/order/`, {
          id: parseInt(draggableId),
          destination_index: destination.index,
        });
      } catch {
        console.log("Error");
      }
    }

    if (type === "tasks") {
      client.setQueryData(
        { queryKey: ["tasks", parseInt(source.droppableId)] },
        (prev) => {
          let old = prev;
          movedItem = old.splice(source.index, 1)[0];
          return old;
        }
      );
      client.setQueryData(
        { queryKey: ["tasks", parseInt(destination.droppableId)] },
        (prev) => {
          let old = prev;

          if (movedItem) {
            movedItem.status = destination.droppableId;

            old.splice(destination.index, 0, movedItem);
          }

          return old;
        }
      );

      http.post(`/tasks/order`, {
        id: parseInt(draggableId),
        source_status: source.droppableId,
        destination_index: destination.index,
        destination_status: destination.droppableId,
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
