import { useState } from "react";
import {
  Container,
  DivRow,
  Title,
  Button,
  DropDownOptions,
  Option,
} from "./styles";
import { PiPlusThin } from "react-icons/pi";
import Board from "../../components/board";
import Modal from "../../components/modal";

export default function Kanban() {
  const [dropdown, setDropdown] = useState(false);
  const [modal, setModal] = useState();
  return (
    <>
      <Container>
        <DivRow>
          <Title>Kanban</Title>
          <Button onClick={() => setDropdown(true)}>
            <PiPlusThin size={25} />
          </Button>
          <DropDownOptions
            opacity={dropdown}
            onMouseLeave={() => setDropdown(false)}
          >
            <Option onClick={() => setModal("column")}>Criar coluna</Option>
            <Option onClick={() => setModal("task")}>Criar tarefa</Option>
          </DropDownOptions>
        </DivRow>
        <Board />
      </Container>
      {modal === "column" && <Modal setModal={setModal}></Modal>}
    </>
  );
}
