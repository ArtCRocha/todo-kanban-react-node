import http from "../../services/http";
import Form from "../formComponents";
import { useQueryClient } from "@tanstack/react-query";

export default function FormCreateColumn() {
  const client = useQueryClient();

  function handleSubmit(value) {
    http
      .post("/columns/", {
        name: value.name,
      })
      .then(
        (res) => {
          client.setQueryData({ queryKey: ["columns"] }, (prev) => {
            let old = prev;
            old.push(res.data[0]);
            return old;
          });
        },
        (err) => {
          console.dir(err);
        }
      );
  }
  return (
    <Form data={{ name: "" }} onSubmit={handleSubmit}>
      <Form.Input name="name" />
      <Form.Submit>Criar coluna</Form.Submit>
    </Form>
  );
}
