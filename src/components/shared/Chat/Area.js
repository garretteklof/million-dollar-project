import React from "react";
import styled from "styled-components";

const Area = styled.ul`
  height: 100%;
  width: 100%;
  background: lightgrey;
`;
const ChatArea = ({ messages }) => (
  <Area>
    {messages.map(message => (
      <li key={message._id}>{message.content}</li>
    ))}
  </Area>
);

export default ChatArea;
