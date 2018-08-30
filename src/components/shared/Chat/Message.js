import React from "react";
import styled from "styled-components";

const Message = styled.li`
  /* background: green; */
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  grid-column-gap: 1.5rem;
`;

const Avatar = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 100%;
`;

const Content = styled.div`
  position: relative;
  background: white;
  padding: 1rem;
  align-self: start;
  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    top: 50%;
    bottom: 50%;
    transform: translateY(-50%);
    left: -1.25rem;
    width: 0;
    height: 0;
    border-top: 2rem solid white;
    border-left: 2rem solid transparent;
  }
`;

const ChatMessage = ({ message, buildMessage, ...rest }) => {
  const obj = buildMessage(message);
  const { avatar, sender } = obj;
  return (
    <Message>
      <Avatar src={avatar} />
      <Content children={message.content} />
    </Message>
  );
};

export default ChatMessage;
