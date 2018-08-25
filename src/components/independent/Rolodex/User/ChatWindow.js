import React from "react";
import io from "socket.io-client";
import styled from "styled-components";

import ChatInput from "./ChatInput";
import ChatSpace from "./ChatSpace";

const ChatWindow = styled.div`
  height: 30rem;
  width: 30rem;
  background: papayawhip;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default class UserChatWindow extends React.Component {
  state = {
    input: "",
    socket: null,
    messages: []
  };

  componentDidMount() {
    const socket = io("/chat");
    this.setState({ socket });
  }

  handleInput = e => {
    const input = e.target.value;
    this.setState({ input }, () => {
      const { input, socket } = this.state;
      socket.on("connect", () => {
        socket.emit("createMessage", {
          input
        });
      });
    });
  };

  onSendChatClick = () => {
    let messages = this.state.messages;
    const { input } = this.state;
    if (input !== "") messages.push(input);
    this.setState({ messages, input: "" });
  };

  render() {
    return (
      <ChatWindow>
        <ChatSpace messages={this.state.messages} />
        <ChatInput
          input={this.state.input}
          type="text"
          placeholder="type a message"
          onChange={this.handleInput}
          onClick={this.onSendChatClick}
        />
      </ChatWindow>
    );
  }
}
