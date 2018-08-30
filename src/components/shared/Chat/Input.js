import React from "react";
import styled from "styled-components";

import { COLORS } from "../Variables";

const Wrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
`;

const MessageInput = styled.textarea`
  border: none;
  resize: none;
  height: 4rem;
  width: 100%;
  border: 1px solid ${COLORS.timberwolf};
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1.6rem;
  &:focus {
    outline: none;
  }
`;

const ChatInput = ({ onSend, handleInput, input, recipients }) => (
  <Wrapper>
    <MessageInput
      type="text"
      placeholder={`Chat with ${recipients[0].name.first}...`}
      value={input}
      onChange={handleInput}
      onKeyDown={e => e.keyCode === 13 && onSend()}
      autoFocus
    />
  </Wrapper>
);

export default ChatInput;
