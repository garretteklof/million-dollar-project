import React from "react";
import styled from "styled-components";

const Avatar = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
  object-fit: cover;
`;
const ChatAvatar = ({ recipients }) => <Avatar src={recipients[0].avatar} />;

export default ChatAvatar;
