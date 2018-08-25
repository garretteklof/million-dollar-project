import React from "react";
import styled from "styled-components";

const ChatSpace = styled.ul`
  height: 100%;
  width: 100%;
  background: lightgrey;
`;
const UserChatSpace = ({ messages }) => (
  <ChatSpace>
    {messages.map(message => (
      <li key={message}>{message}</li>
    ))}
  </ChatSpace>
);

export default UserChatSpace;
