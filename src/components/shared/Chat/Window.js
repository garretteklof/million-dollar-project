import React from "react";
import styled from "styled-components";
import Banner from "./Banner";
import Input from "./Input";
import Area from "./Area";

const Window = styled.div`
  z-index: -3;
  position: relative;
  height: calc(100% - 7.5rem - 2rem);
  width: 100%;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
  &::after {
    content: "";
    position: absolute;
    bottom: -4rem;
    right: 8rem;
    width: 0;
    height: 0;
    border-top: 4rem solid #f3f3f3;
    border-left: 4rem solid transparent;
  }
`;

const ChatWindow = props => (
  <Window>
    <Banner {...props} />
    <Area {...props} />
    <Input {...props} />
  </Window>
);

export default ChatWindow;
