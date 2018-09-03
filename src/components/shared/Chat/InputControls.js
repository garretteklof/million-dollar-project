import React from "react";
import styled from "styled-components";
import EmojiPicker from "../EmojiPicker/";
import Sprite from "../Sprite/";
import { COLORS } from "../Variables";

const Wrapper = styled.div`
  width: auto;
  height: 4rem;
  background: white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  > * {
    cursor: pointer;
  }
`;

const SendControl = styled.a`
  margin-left: 1rem;
  > svg {
    height: 2.5rem;
    width: 2.5rem;
    fill: lightgray;
    &:hover {
      fill: ${COLORS.gunmetal};
    }
  }
`;

const InputControls = ({ onEmojiPicked, onSend }) => (
  <Wrapper>
    <EmojiPicker onEmojiPicked={onEmojiPicked} />
    <SendControl onClick={onSend}>
      <Sprite icon={"paper-plane"} />
    </SendControl>
  </Wrapper>
);

export default InputControls;
