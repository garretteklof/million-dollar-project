import React from "react";
import styled from "styled-components";

import Input from "./Input";
import Area from "./Area";

const Window = styled.div`
  height: 30rem;
  width: 30rem;
  background: papayawhip;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChatWindow = ({ messages, ...rest }) => (
  <Window>
    <Area messages={messages} />
    <Input type="text" placeholder="type a message" {...rest} />
  </Window>
);

export default ChatWindow;
