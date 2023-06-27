import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 100%;
  height: 100vh;

  position: absolute;

  z-index: 2;

  top: 0;
  left: 0;
`;

export const Overlay = styled.div`
  background-color: #0004;
  width: 100%;
  height: 100%;

  position: absolute;

  z-index: 2;

  top: 0;
  left: 0;
`;

export const ContentForm = styled.div`
  background-color: #fff;
  max-width: 550px;
  width: 100%;
  height: 100vh;

  overflow-y: auto;

  padding: 20px;

  z-index: 3;

  position: absolute;

  right: 0;

  @media (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;
