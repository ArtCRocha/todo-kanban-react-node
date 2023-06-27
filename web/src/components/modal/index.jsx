import { ContainerModal, ContentForm, Overlay } from "./styles";

export default function Modal({ setModal }) {
  return (
    <ContainerModal>
      <Overlay onClick={() => setModal(false)} />
      <ContentForm />
    </ContainerModal>
  );
}
