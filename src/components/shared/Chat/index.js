import React from "react";
import io from "socket.io-client";
import styled from "styled-components";

import Window from "./Window";
import Toggle from "./Toggle";

const Wrapper = styled.div`
  height: 45rem;
  width: 45rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;
export default class Chat extends React.Component {
  state = {
    isOpen: true,
    socket: null,
    input: "",
    messages: []
  };

  componentDidMount() {
    const socket = io("/chat");
    this.setState({ socket });
  }

  handleInput = e => {
    const input = e.target.value;
    this.setState({ input });
  };

  onToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  sendMessageToServer = message =>
    this.state.socket.emit("sendMessage", { message });

  onSend = () => {
    const { input } = this.state;
    let messages = this.state.messages;
    if (input === "") return;
    messages.push(input);
    this.sendMessageToServer(input);
    this.setState({ messages, input: "" });
  };

  render() {
    return (
      <Wrapper>
        {this.state.isOpen && (
          <Window
            onSend={this.onSend}
            handleInput={this.handleInput}
            {...this.state}
          />
        )}
        <Toggle onToggle={this.onToggle} />
      </Wrapper>
    );
  }
}
