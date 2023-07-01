import styled from "styled-components";

export const FormStyle = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 15px;
`;

export const Label = styled.label`
  font-size: 12px;

  color: #2a2a2a;
`;

export const InputGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 10px;
`;

export const InputStyle = styled.input`
  width: 100%;

  padding: 10px 15px;

  border-radius: 5px;
  border: 1px solid #e1e1e1;

  color: #2a2a2a;

  outline: none;
`;

export const TextareaStyle = styled.textarea`
  width: 100%;
  min-height: 400px;

  padding: 10px 15px;

  border-radius: 5px;
  border: 1px solid #e1e1e1;

  color: #2a2a2a;

  outline: none;
`;

export const SelectStyle = styled.select`
  width: 100%;

  padding: 10px 15px;

  border-radius: 5px;
  border: 1px solid #e1e1e1;

  color: #2a2a2a;

  outline: none;
`;

export const ButtonSubmitStyle = styled.button`
  background-color: ${(props) => (props.red ? "#FF3D31" : "#008ede")};
  width: fit-content;
  padding: 10px 15px;

  border-radius: 5px;

  border: none;

  outline: none;

  color: #fff;
  cursor: pointer;
`;

export const Option = styled.option`
  font-size: 12px;
`;
