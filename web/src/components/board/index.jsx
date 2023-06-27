import {
  ContainerColumns,
  Column,
  TitleColumn,
  CountColumn,
  Card,
  TitleCard,
  DescriptionCard,
  ContainerActions,
} from "./styles";
import { DivRow } from "../../pages/kanban/styles";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllColumns } from "../../services/api/column";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import http from "../../services/http";

export default function Board() {
  const columns = useQuery({
    queryKey: ["columns"],
    queryFn: getAllColumns,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const client = useQueryClient();

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;

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
    <ContainerColumns>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns?.data?.map((column) => {
          return (
            <Droppable droppableId={`${column.id}`} key={column.id}>
              {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  <TitleColumn>
                    {column?.name}{" "}
                    <CountColumn>{column.tasks.length}</CountColumn>
                  </TitleColumn>
                  {column.tasks.map((task, index) => {
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
                </Column>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </ContainerColumns>
  );
}
