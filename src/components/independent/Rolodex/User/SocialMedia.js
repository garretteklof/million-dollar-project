import React from "react";
import styled from "styled-components";
import {
  Container as SMC,
  SpriteShape
} from "../../../shared/User/SocialMedia/styles";
import SocialMedia from "../../../shared/User/SocialMedia/";

const SMLink = styled(SpriteShape.withComponent("a"))``;
const SMContainer = styled(SMC)`
  &.override {
    flex-direction: column;
    > a {
      margin: 0;
      height: 4rem;
      width: 4rem;
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
      > svg {
        height: 2.5rem;
        width: 2.5rem;
      }
    }
  }
`;

const UserSocialMedia = ({ forte, socialMedia }) => (
  <SocialMedia
    {...{
      forte,
      socialMedia,
      Container: SMContainer,
      SpriteShape: SMLink,
      overrideStyles: true,
      isLink: true
    }}
  />
);

export default UserSocialMedia;
