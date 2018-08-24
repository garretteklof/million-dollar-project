import React from "react";
import io from "socket.io-client";

export default class Chat extends React.Component {
  componentDidMount() {
    const socket = io("/chat");
    console.log(socket);
    socket.on("test", data => console.log(data));
  }
  render() {
    return <div> Chat area </div>;
  }
}
