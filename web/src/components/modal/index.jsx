import { ContainerModal, ContentForm, Overlay } from "./styles";

export default function Modal({ setModal, children }) {
  return (
    <ContainerModal>
      <Overlay onClick={() => setModal(false)} />
      <ContentForm>{children}</ContentForm>
    </ContainerModal>
  );
}
