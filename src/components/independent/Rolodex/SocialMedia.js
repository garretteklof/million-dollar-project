import React from "react";
import styled from "styled-components";

import Sprite from "../../shared/Sprite/";
import { FORTE_PROP_BG } from "../../shared/Variables";

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
`;

const SocialMediaLink = FORTE_PROP_BG.withComponent("a").extend`
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
  > svg {
    height: 1rem;
    width: 1rem;
    fill: white;
  }
`;

export default class SocialMedia extends React.Component {
  setSocialMedia = () => {
    const { socialMedia, forte } = this.props;
    let mediaArray = [];
    Object.entries(socialMedia).forEach(([key, value]) => {
      mediaArray.push(
        <SocialMediaLink key={key} href={value} {...{ [forte]: true }}>
          <Sprite icon={key.toLowerCase()} />
        </SocialMediaLink>
      );
    });
    return mediaArray;
  };

  render() {
    return <SocialMediaContainer>{this.setSocialMedia()}</SocialMediaContainer>;
  }
}
