import http from "../../services/http";
import Form from "../formComponents";
import { useQueryClient } from "@tanstack/react-query";
import { MessageWrapper, TextAlert, TextDelete } from "./styles";
import { useState } from "react";
import { ContainerText } from "../board/styles";

export default function FormDeleteColumn({ data, setModal }) {
  const [message, setMessage] = useState();
  const client = useQueryClient();

  function handleSubmit() {
    http.delete(`/columns/${data.id}/`).then(
      (res) => {
        client.invalidateQueries({ queryKey: ["columns"] });

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
      <Form.Title>Apagar coluna</Form.Title>
      <ContainerText>
        <TextAlert>Tem certeza que deseja apagar a coluna:</TextAlert>
        <TextDelete>{data?.name} ?</TextDelete>
        <TextAlert>
          Todas as tarefas relacionadas á essa coluna também serão apagadas
        </TextAlert>
      </ContainerText>

      <Form.Submit cancel>Deletar coluna</Form.Submit>
      {message && (
        <MessageWrapper color={message.color}>{message.title}</MessageWrapper>
      )}
    </Form>
  );
}
