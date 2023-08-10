import http from "../../services/http";
import Form from "../formComponents";
import { useQueryClient } from "@tanstack/react-query";
import { MessageWrapper, TextAlert, TextDelete } from "./styles";
import { useState } from "react";
import { ContainerText } from "../board/styles";

export default function FormDeleteTask({ task, setModal }) {
  const [message, setMessage] = useState();
  const client = useQueryClient();

  function handleSubmit() {
    http.delete(`/tasks/${task?.id}/`).then(
      (res) => {
        client.invalidateQueries({
          queryKey: ["tasks", parseInt(task?.status)],
        });

        setModal(false);

        setMessage({ title: res.data.message, color: "red" });

        setTimeout(() => {
          setMessage(null);
        }, 2600);
      },
      (err) => {
        console.dir(err);
      }
    );
  }

  return (
    <Form data={{}} onSubmit={handleSubmit}>
      <Form.Title>Apagar tarefa</Form.Title>
      <ContainerText>
        <TextAlert>Tem certeza que deseja apagar a tarefa:</TextAlert>
        <TextDelete>{task?.name} ?</TextDelete>
      </ContainerText>
      <Form.Submit cancel>Deletar tarefa</Form.Submit>
      {message && (
        <MessageWrapper color={message.color}>{message.title}</MessageWrapper>
      )}
    </Form>
  );
}
