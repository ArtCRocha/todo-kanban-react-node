import { useRef } from "react";
import { getAllColumns } from "../../services/api/column";
import http from "../../services/http";
import Form from "../formComponents";
import { useQuery, useQueryClient } from "@tanstack/react-query";

let updatedTask;
export default function FormEditTask({ task, setModal }) {
  const client = useQueryClient();

  const formRef = useRef();

  const columns = useQuery({
    queryKey: ["columns"],
    queryFn: getAllColumns,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  function handleSubmit(values) {
    http
      .patch(`/tasks/${task?.id}`, {
        name: values.name,
        description: values.description,
        status: values.status,
      })
      .then(
        (res) => {
          setModal(false);

          if (values.status !== task?.status) {
            client.setQueryData(["tasks", parseInt(task?.status)], (prev) => {
              let old = prev;

              let taskIndex = old.findIndex((x) => x.id === res.data.id);
              updatedTask = old[taskIndex];

              old.splice(taskIndex, 1);

              return old;
            });

            client.setQueryData(["tasks", parseInt(values.status)], (prev) => {
              let old = prev;

              old.push(updatedTask);

              return old;
            });
          } else {
            client.setQueryData(["tasks", parseInt(task?.status)], (prev) => {
              let old = prev;

              let taskIndex = old.findIndex((x) => x.id === res.data.id);
              old[taskIndex] = res.data;

              return old;
            });
          }
        },
        (err) => {
          console.dir(err);
        }
      );
  }

  return (
    <Form
      innerRef={(ref) => (formRef.current = ref)}
      data={{
        name: task?.name,
        description: task?.description,
        status: task?.status,
      }}
      onSubmit={handleSubmit}
    >
      <Form.Title>Editar tarefa</Form.Title>
      <Form.Input
        name="name"
        label="Nome da tarefa"
        placeHolder="Ex: Cuidar dos cães"
      />
      <Form.Textarea
        name="description"
        label="Descrição da tarefa"
        placeHolder="Ex: - Trocar água;  - Colocar ração; - Levar para passear;"
      />
      <Form.Select name="status" array={columns?.data} label="Status" />
      <Form.Submit>Editar tarefa</Form.Submit>
    </Form>
  );
}
