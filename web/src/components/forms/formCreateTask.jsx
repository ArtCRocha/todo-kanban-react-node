import { useRef } from "react";
import { getAllColumns } from "../../services/api/column";
import http from "../../services/http";
import Form from "../formComponents";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function FormCreateTask({ setModal }) {
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
      .post("/tasks/", {
        name: values.name,
        description: values.description,
        status: values.status,
      })
      .then(
        (res) => {
          setModal(false);
          client.setQueryData(
            { queryKey: ["tasks", formRef.current?.values?.status] },
            (prev) => {
              let old = prev;
              old.push(res.data);
              return old;
            }
          );
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
        name: "",
        description: "",
        status: columns?.data[0].id,
      }}
      onSubmit={handleSubmit}
    >
      <Form.Title>Criar tarefa</Form.Title>
      <Form.Input
        name="name"
        label="Nome da tarefa"
        placeHolder="Ex: Cuidar dos cães"
      />
      <Form.Editor name="description" label="Descrição da tarefa" />
      <Form.Select
        name="status"
        options={columns?.data?.map((column) => {
          return {
            label: column.name,
            value: column.id,
          };
        })}
        label="Status"
      />
      <Form.Submit>Criar tarefa</Form.Submit>
    </Form>
  );
}
