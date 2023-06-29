import { ContainerColumns } from "./styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllColumns } from "../../services/api/column";
import { DragDropContext } from "react-beautiful-dnd";
import http from "../../services/http";
import { useState } from "react";
import Modal from "../modal";
import FormDeleteColumn from "../forms/formDeleteColumn";
import ColumnComponent from "./column";

let movedColumn = "";
let overColumn = "";
let movedColIndex = "";
let overColIndex = "";
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

  function onDragStart(e, item) {
    e.stopPropagation();
    movedColumn = item;
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e, item) {
    e.preventDefault();
    overColumn = item;

    client.setQueriesData({ queryKey: ["columns"] }, (prev) => {
      let old = [...prev];

      movedColIndex = old.findIndex((x) => x.id === movedColumn.id);
      overColIndex = old.findIndex((x) => x.id === overColumn.id);

      old[movedColIndex] = overColumn;
      old[overColIndex] = movedColumn;

      return old;
    });
  }

  return (
    <>
      <ContainerColumns>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns?.data?.map((column) => {
            return (
              <ColumnComponent
                onDragStart={(e) => {
                  onDragStart(e, column);
                }}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => {
                  if (movedColumn) {
                    onDrop(e, column);
                  }
                }}
                column={column}
              />
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
