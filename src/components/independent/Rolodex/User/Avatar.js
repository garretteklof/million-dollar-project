import React from "react";
import styled from "styled-components";

const AvatarImage = styled.img`
  height: 20rem;
  width: 20rem;
  border-radius: 1rem;
`;

const Avatar = ({ avatar, firstName, lastName }) => (
  <AvatarImage src={avatar} alt={`${firstName} ${lastName}'s avatar`} />
);

export default Avatar;
