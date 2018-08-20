import React from "react";
import styled from "styled-components";

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > a {
    height: 2rem;
    width: 2rem;
    background: black;
    border-radius: 100%;
    &:not(:first-of-type) {
      margin-left: 0.5rem;
    }
    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`;

const SocialMedia = () => (
  <SocialMediaContainer>
    <a />
    <a />
    <a />
  </SocialMediaContainer>
);

export default SocialMedia;
