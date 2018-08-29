import React from "react";
import styled from "styled-components";
import Sprite from "../Sprite/";

import { COLORS } from "../Variables";

const Wrapper = styled.div`
  margin-top: auto;
  display: flex;
  align-items: stretch;
  background-color: papayawhip;
  width: 100%;
  height: 5rem;
`;
const MessageInput = styled.textarea`
  border: none;
  resize: none;
  border: 2px solid ${COLORS.gunmetal};
  width: calc(100% - 6rem);
  height: 100%;
  padding: 0.75rem;
  font-size: 1.4rem;
`;
const SendButton = styled.a`
  text-decoration: none;
  width: 8rem;
  height: 100%;
  background-color: ${COLORS.gunmetal};
  color: ${COLORS.gunmetal};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > svg {
    fill: white;
    height: 3rem;
    width: 3rem;
  }
`;

const ChatInput = ({ onSend, handleInput, input, ...rest }) => (
  <Wrapper>
    <MessageInput value={input} onChange={handleInput} {...rest} />
    <SendButton onClick={onSend}>
      <Sprite icon={"paper-plane"} />
    </SendButton>
  </Wrapper>
);

export default ChatInput;
