import http from "../../services/http";
import Form from "../formComponents";
import { useQueryClient } from "@tanstack/react-query";
import { MessageWrapper, TextAlert } from "./styles";
import { useState } from "react";

export default function FormDeleteColumn({ data, setModal }) {
  const [message, setMessage] = useState();
  const client = useQueryClient();

  function handleSubmit() {
    http.delete(`/columns/${data.id}/`).then(
      (res) => {
        client.setQueryData({ queryKey: ["columns"] }, (prev) => {
          let old = prev;
          let itemIndex = old.findIndex((x) => x.id === data.id);
          old.splice(itemIndex, 1);
          return old;
        });

        setMessage({ title: res.data.message, color: "red" });

        setTimeout(() => {
          setMessage(null);
          setModal(false);
        }, 2600);
      },
      (err) => {
        console.dir(err);
      }
    );
  }

  return (
    <Form data={{}} onSubmit={handleSubmit}>
      <TextAlert>
        Tem certeza que deseja apagar a tarefa: {data?.name} ?
      </TextAlert>
      <TextAlert>
        Todas as tarefas relacionadas á essa coluna também serão apagadas
      </TextAlert>
      <Form.Submit red>Deletar coluna</Form.Submit>
      {message && (
        <MessageWrapper color={message.color}>{message.title}</MessageWrapper>
      )}
    </Form>
  );
}
