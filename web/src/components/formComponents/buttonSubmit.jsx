import { ButtonSubmitStyle } from "./styles";

export default function ButtonSubmit({ children, cancel }) {
  return (
    <ButtonSubmitStyle red={cancel} type="submit">
      {children}
    </ButtonSubmitStyle>
  );
}
