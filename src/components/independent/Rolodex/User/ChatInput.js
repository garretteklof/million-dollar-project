import React from "react";
import styled from "styled-components";

const ChatInputWrapper = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
`;
const ChatMessageInput = styled.input`
  width: 100%;
`;
const ChatButton = styled.a`
  text-decoration: none;
  padding: 2rem 4rem;
  background-color: pink;
  cursor: pointer;
`;
export default class UserChatInput extends React.Component {
  render() {
    const { onClick, onChange, input, ...rest } = this.props;
    return (
      <ChatInputWrapper>
        <ChatMessageInput value={input} onChange={onChange} {...rest} />
        <ChatButton onClick={onClick}>Send</ChatButton>
      </ChatInputWrapper>
    );
  }
}
