import styled from "styled-components";

export const ContainerColumns = styled.div`
  width: 100%;
  height: 83vh;

  overflow: auto;
  margin-top: 15px;

  display: flex;

  gap: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 250px;

  padding: 5px;

  gap: 10px;

  cursor: move;
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;

  border: ${(props) => (props.border ? "" : "1px dashed #ccc")};
  border-radius: 5px;
`;

export const TitleColumn = styled.p`
  font-size: 14px;
  color: #2a2a2a;

  display: flex;
  align-items: center;

  gap: 5px;

  margin-bottom: 10px;
`;

export const CountColumn = styled.p`
  background-color: #008ede;
  width: 25px;
  height: 25px;

  border-radius: 13px;

  color: #fff;

  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background-color: #fff;
  width: 100%;

  padding: 10px;

  border-radius: 5px;

  box-shadow: 5px 5px 7px #0002;
`;

export const TitleCard = styled.p`
  font-size: 14px;
  color: #2a2a2a;

  font-weight: 500;

  margin-bottom: 5px;
`;

export const DescriptionCard = styled.p`
  font-size: 10px;
  color: #2a2a2a;

  font-weight: 400;
`;

export const ContainerActions = styled.div`
  display: flex;
  gap: 10px;

  justify-content: flex-end;

  width: 100%;
  margin-top: 15px;
`;

export const ContainerIcon = styled.div`
  cursor: pointer;

  color: red;
`;
