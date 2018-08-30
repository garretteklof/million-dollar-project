import React from "react";
import styled from "styled-components";

const Area = styled.div`
  height: 100%;
  width: 100%;
  background: #fcfcfc;
`;
const ChatArea = ({ messages }) => (
  <Area>
    {messages.map(message => (
      <div key={message._id}>{message.content}</div>
    ))}
  </Area>
);

export default ChatArea;
