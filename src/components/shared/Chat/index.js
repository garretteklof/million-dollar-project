import React from "react";
//import io from "socket.io-client";
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

//const socket = io("/chat");
export default class Chat extends React.Component {
  state = {
    isOpen: false,
    input: "",
    messages: [],
    sender: null,
    recipients: [],
    allParticipants: [],
    convoId: null
  };

  componentDidMount() {
    window.addEventListener(
      "keydown",
      this.performCloseToggle(e => e.keyCode === 27)
    );
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
      if (this.state.isOpen) {
        const { allParticipants } = this.state;
        const token = localStorage.getItem("x-auth-token");
        let convo = await callGetConvos(allParticipants.toString(), token);
        if (convo.data) {
          const messages = await callGetMessages(convo.data._id, token);
          this.setState({
            messages: messages.data,
            convoId: convo.data._id
          });
        } else {
          convo = await callPostConvos(allParticipants, token);
          this.setState({
            convoId: convo.data._id
          });
        }
      }
    });
  };

  sendMessageToServer = message => {
    const token = localStorage.getItem("x-auth-token");
    return callPostMessages(message, token);
  };

  onSend = async () => {
    const { input, sender, convoId } = this.state;
    const mesObj = { convoId, sender: sender._id, content: input };
    let messages = this.state.messages;
    if (input === "") return;
    const { data } = await this.sendMessageToServer(mesObj);
    messages.push(data);
    this.setState({ messages, input: "" });
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
