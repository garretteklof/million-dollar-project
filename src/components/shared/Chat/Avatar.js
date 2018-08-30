import React from "react";
import styled from "styled-components";

const Avatar = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 100%;
  object-fit: cover;
`;
const ChatAvatar = ({ recipients }) => <Avatar src={recipients[0].avatar} />;

export default ChatAvatar;
