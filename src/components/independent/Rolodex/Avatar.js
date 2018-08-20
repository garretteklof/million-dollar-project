import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  width: 10rem;
  height: 100%;
  border-radius: 4px;
`;
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Avatar = ({ avatar, name }) => (
  <AvatarContainer>
    <AvatarImage src={avatar} alt={`${name.first} ${name.last}'s avatar`} />
  </AvatarContainer>
);

export default Avatar;
