import React from "react";
import styled from "styled-components";
import Message from "./Message";

const Area = styled.ul`
  list-style: none;
  height: 100%;
  width: 100%;
  padding: 2rem;
  padding-bottom: 0;
  display: grid;
  align-content: start;
  align-items: start;
  grid-template-columns: 1fr;
  grid-row-gap: 3rem;
  overflow-y: scroll;
`;
const ChatArea = ({ messages, ...rest }) => (
  <Area>
    {messages.map(message => (
      <Message key={message._id} message={message} {...rest} />
    ))}
  </Area>
);

export default ChatArea;
