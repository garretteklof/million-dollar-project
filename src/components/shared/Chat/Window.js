import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

import Input from "./Input";
import Area from "./Area";

const Window = styled.div`
  position: relative;
  height: calc(100% - 7.5rem - 2rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
  box-shadow: 0rem 4rem 8rem ${rgba("black", 0.1)};
  &::after {
    content: "";
    position: absolute;
    bottom: -4rem;
    right: 8rem;
    width: 0;
    height: 0;
    border-top: 4rem solid #fcfcfc;
    border-left: 4rem solid transparent;
  }
`;

const ChatWindow = ({ messages, ...rest }) => (
  <Window>
    <Area messages={messages} />
    <Input {...rest} />
  </Window>
);

export default ChatWindow;
