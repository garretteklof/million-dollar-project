import React from "react";
import styled from "styled-components";
import Sprite from "../Sprite/";

const Banner = styled.div`
  height: 6rem;
  padding: 1rem 2rem;
  width: 100%;
  background: linear-gradient(to right, #00fddc, #40f99b);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  font-size: 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  > svg {
    fill: white;
    height: 3rem;
    width: 3rem;
  }
`;

const Name = styled.p`
  margin-left: 1rem;
  margin-right: auto;
  font-size: 1.4rem;
`;

const ChatBanner = ({ recipients, onToggle }) => (
  <Banner>
    <Sprite icon={"message"} />
    <Name>{recipients[0].name.first + " " + recipients[0].name.last}</Name>
    <Sprite icon={"x"} onClick={onToggle} style={{ cursor: "pointer" }} />
  </Banner>
);

export default ChatBanner;
