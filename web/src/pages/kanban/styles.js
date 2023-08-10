import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;

  padding: 20px;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 10px;
  }
`;

export const DivRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 100%;

  padding: 0;

  margin: 0;
`;

export const Title = styled.h1`
  color: #2a2a2a;
`;

export const Button = styled.div`
  background-color: #fff;

  width: 40px;
  height: 40px;

  border-radius: 20px;

  box-shadow: 0 0 10px #0002;

  outline: none;
  border: none;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropDownOptions = styled.div`
  background-color: #fff;

  width: 120px;
  height: ${(props) => (props.show ? "auto" : "0px")};
  box-shadow: ${(props) => (props.show ? " 0 0 10px #0002" : "unset")};

  overflow: ${(props) => (props.show ? "auto" : "hidden")};

  padding: ${(props) => (props.show ? "5px" : "0px")};
  border-radius: 5px;

  position: absolute;
  right: -10px;
  top: 50px;

  opacity: ${(props) => (props.show ? "1" : "0")};

  transition: 0.2s;

  z-index: 1000;

  :hover {
    background-color: rgb(245, 245, 245);
  }
`;

export const Option = styled.p`
  width: 100%;
  height: ${(props) => (props.show ? "auto" : "0")};

  padding: ${(props) => (props.show ? "5px 7px" : "0")};

  font-size: 12px;
  cursor: pointer;

  background-color: #fff;

  opacity: ${(props) => (props.show ? "1" : "0")};

  border-radius: 5px;
`;
