import styled from "styled-components";

export const ContainerDetailTask = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: ${(props) => props.weight || "400"};
  list-style-position: inside;
`;
