import React from "react";
import styled, { css } from "styled-components";

const Message = styled.li`
  display: grid;
  grid-template-columns: min-content minmax(min-content, 70%);
  justify-content: start;
  justify-items: start;
  align-items: center;
  grid-column-gap: 1.5rem;
  font-size: 1.6rem;
  z-index: 1;
  ${props =>
    props.sender &&
    css`
      grid-column-gap: none;
      grid-template-columns: minmax(min-content, 70%);
      justify-content: end;
      justify-items: end;
      > div {
        background: linear-gradient(to left, #00fddc, #40f99b);
        color: white;
        min-width: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        &::after {
          border: none;
          top: auto;
          left: auto;
          transform: none;
          border-bottom: 3.5rem solid #00fddc;
          border-right: 3.5rem solid transparent;
          bottom: -0.7rem;
          right: 0;
          transform: rotate(30deg);
        }
      }
    `};
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
  border-radius: 0.5rem;
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

const ChatMessage = ({ message, sender, recipients }) => (
  <Message sender={message.sender === sender._id}>
    {message.sender !== sender._id && <Avatar src={recipients[0].avatar} />}
    <Content
      children={message.content}
      sender={message.sender === sender._id}
    />
  </Message>
);

export default ChatMessage;
