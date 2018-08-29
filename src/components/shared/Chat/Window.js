import React from "react";
import styled from "styled-components";

import Input from "./Input";
import Area from "./Area";

const Window = styled.div`
  height: calc(100% - 7.5rem - 2rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const ChatWindow = ({ messages, ...rest }) => (
  <Window>
    <Area messages={messages} />
    <Input type="text" placeholder="type a message" {...rest} />
  </Window>
);

export default ChatWindow;
