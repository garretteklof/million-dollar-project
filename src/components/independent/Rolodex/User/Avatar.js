import React from "react";
import styled from "styled-components";
import SocialMedia from "./SocialMedia";

const Wrap = styled.div`
  position: relative;
`;

const Image = styled.img`
  height: 20rem;
  width: 20rem;
  border-radius: 1rem;
`;

const Avatar = ({ avatar, first, last, ...rest }) => (
  <Wrap>
    <Image src={avatar} alt={`${first} ${last}'s avatar`} />
    <SocialMedia {...rest} />
  </Wrap>
);

export default Avatar;
