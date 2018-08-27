import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
`;
const MessageInput = styled.input`
  width: 100%;
`;
const SendButton = styled.a`
  text-decoration: none;
  padding: 2rem 4rem;
  background-color: pink;
  cursor: pointer;
`;

const ChatInput = ({ onSend, handleInput, input, ...rest }) => (
  <Wrapper>
    <MessageInput value={input} onChange={handleInput} {...rest} />
    <SendButton onClick={onSend}>Send</SendButton>
  </Wrapper>
);

export default ChatInput;
