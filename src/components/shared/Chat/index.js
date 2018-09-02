import React from "react";
import io from "socket.io-client";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import Window from "./Window";
import Toggle from "./Toggle";
import {
  callGetConvos,
  callPostConvos,
  callGetMessages,
  callPostMessages
} from "../../../api/chat";

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  bottom: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${props =>
    props.overlay &&
    css`
      height: 100%;
      width: 100%;
      justify-content: flex-end;
      &::before {
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: ${rgba("white", 0.75)};
        filter: blur(1rem);
      }
    `};
`;

export default class Chat extends React.Component {
  state = {
    isOpen: false,
    input: "",
    messages: [],
    sender: null,
    recipients: [],
    allParticipants: [],
    convoId: null,
    socket: null
  };

  componentDidMount() {
    window.addEventListener(
      "keydown",
      this.performCloseToggle(e => e.keyCode === 27)
    );
    const socket = io("/chat");
    this.setState({ socket });
    socket.on("messageCreated", ({ message }) => {
      let messages = this.state.messages;
      messages.push(message);
      this.setState({ messages, input: "" });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { userLoggedIn, userWithSummary } = this.props;
      if (userLoggedIn && userWithSummary) {
        const sender = userLoggedIn;
        const recipients = [userWithSummary];
        const allParticipants = [userWithSummary._id, userLoggedIn._id];
        this.setState({
          sender,
          recipients,
          allParticipants
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "keydown",
      this.performCloseToggle(e => e.keyCode === 27)
    );
  }

  /* a little bit convoluted reusable function which takes in event condition */
  performCloseToggle = condition => e =>
    condition(e) && this.state.isOpen && this.onToggle();

  handleInput = e => {
    const input = e.target.value;
    this.setState({ input });
  };

  onToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen }, async () => {
      const { isOpen, socket, allParticipants } = this.state;
      if (isOpen) {
        socket.emit("findConvo", { participants: allParticipants });
        await socket.on("convoFound", ({ convoId, messages }) => {
          this.setState({ convoId, messages });
        });
      }
    });
  };

  onSend = async () => {
    const { input, sender, convoId, socket } = this.state;
    const message = { convoId, sender: sender._id, content: input };
    if (input === "") return;
    socket.emit("createMessage", { message });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Wrapper
        overlay={isOpen}
        onClick={this.performCloseToggle(e => e.target === e.currentTarget)}
      >
        {isOpen && (
          <Window
            onSend={this.onSend}
            handleInput={this.handleInput}
            onToggle={this.onToggle}
            {...this.state}
          />
        )}
        <Toggle onToggle={this.onToggle} {...this.state} />
      </Wrapper>
    );
  }
}
