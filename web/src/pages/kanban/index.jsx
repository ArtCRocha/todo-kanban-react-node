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
import FormCreateColumn from "../../components/forms/formCreateColumn";
import FormCreateTask from "../../components/forms/formCreateTask";

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
            show={dropdown}
            onMouseLeave={() => setDropdown(false)}
          >
            <Option show={dropdown} onClick={() => setModal("column")}>
              Criar coluna
            </Option>
            <Option show={dropdown} onClick={() => setModal("task")}>
              Criar tarefa
            </Option>
          </DropDownOptions>
        </DivRow>
        <Board />
      </Container>
      {modal === "column" && (
        <Modal setModal={setModal}>
          <FormCreateColumn setModal={setModal} />
        </Modal>
      )}

      {modal === "task" && (
        <Modal setModal={setModal}>
          <FormCreateTask setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
