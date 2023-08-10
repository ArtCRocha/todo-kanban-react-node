import styled from "styled-components";

export const TextAlert = styled.p`
  font-size: 14px;

  color: #2a2a2a;

  font-weight: 400;
`;

export const MessageWrapper = styled.p`
  background-color: ${(props) => {
    if (props.color === "green") return "#e9fac5";
    else if (props.color === "red") return "#ffeeb4";
    else return "#2a2a2a";
  }};
  font-size: 12px;

  color: ${(props) => {
    if (props.color === "green") return "#a8ea7a";
    else if (props.color === "red") return "#ee614f";
    else return "#2a2a2a";
  }};

  padding: 10px 15px;

  border-radius: 5px;
`;

export const TextDelete = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
