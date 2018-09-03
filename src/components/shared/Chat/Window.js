import React from "react";
import styled from "styled-components";
import Banner from "./Banner";
import Input from "./Input";
import Area from "./Area";

const Window = styled.div`
  position: relative;
  height: calc(50rem - 7.5rem - 4rem);
  width: 40rem;
  background: #f3f3f3;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 4rem;
  &::after {
    content: "";
    position: absolute;
    bottom: -4rem;
    width: 0;
    height: 0;
    border-top: 4rem solid #f3f3f3;
    border-left: 4rem solid transparent;
    transform: rotateY(180deg);
  }
`;

const ChatWindow = props => (
  <Window>
    <Banner {...props} />
    <Area {...props} />
    <Input {...props} />
  </Window>
);

export default ChatWindow;
