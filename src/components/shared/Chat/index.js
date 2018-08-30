import React from "react";
//import io from "socket.io-client";
import styled from "styled-components";
import Window from "./Window";
import Toggle from "./Toggle";
import {
  callGetConvos,
  callPostConvos,
  callGetMessages,
  callPostMessages
} from "../../../api/chat";

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
  align-items: flex-end;
  flex-direction: column;
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { userLoggedIn, userWithSummary } = this.props;
      if (userLoggedIn && userWithSummary) {
        const sender = userLoggedIn;
        const recipients = [userWithSummary];
        const allParticipants = [userWithSummary._id, userLoggedIn._id];
        this.setState({ sender, recipients, allParticipants });
      }
    }
  }

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
          this.setState({ messages: messages.data, convoId: convo.data._id });
        } else {
          convo = await callPostConvos(allParticipants, token);
          this.setState({ convoId: convo.data._id });
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
    return (
      <Wrapper>
        {this.state.isOpen && (
          <Window
            onSend={this.onSend}
            handleInput={this.handleInput}
            {...this.state}
          />
        )}
        <Toggle onToggle={this.onToggle} {...this.state} />
      </Wrapper>
    );
  }
}
