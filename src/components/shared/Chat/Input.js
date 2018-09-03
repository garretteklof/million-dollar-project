import React from "react";
import styled from "styled-components";
import InputControls from "./InputControls";
import { COLORS } from "../Variables";

const Wrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
  position: relative;
`;

const InputWrapper = styled.div`
  border: 1px solid ${COLORS.timberwolf};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: flex;
`;

const MessageInput = styled.textarea`
  border: none;
  resize: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 4rem;
  width: 100%;
  padding: 0.75rem;
  font-size: 1.6rem;
  &:focus {
    outline: none;
  }
`;

const ChatInput = ({
  onSend,
  handleInput,
  onEmojiPicked,
  chatInputRef,
  input,
  recipients
}) => (
  <Wrapper>
    <InputWrapper>
      <MessageInput
        type="text"
        placeholder={`Chat with ${recipients[0].name.first}...`}
        value={input}
        onChange={handleInput}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            onSend();
          }
        }}
        innerRef={chatInputRef}
        autoFocus
      />
      <InputControls onSend={onSend} onEmojiPicked={onEmojiPicked} />
    </InputWrapper>
  </Wrapper>
);

export default ChatInput;
