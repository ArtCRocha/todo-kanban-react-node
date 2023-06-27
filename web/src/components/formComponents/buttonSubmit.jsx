import { ButtonSubmitStyle } from "./styles";

export default function ButtonSubmit({ children, red }) {
  return (
    <ButtonSubmitStyle red={red} type="submit">
      {children}
    </ButtonSubmitStyle>
  );
}
