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

const SocialMediaCircle = FORTE_PROP_BG.extend`
  height: 2.25rem;
  width: 2.25rem;
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
    height: 1.25rem;
    width: 1.25rem;
    fill: white;
  }
`;

export default class SocialMedia extends React.Component {
  setSocialMedia = () => {
    const { socialMedia, forte } = this.props;
    let mediaArray = [];
    Object.entries(socialMedia).forEach(([key, value]) => {
      mediaArray.push(
        <SocialMediaCircle key={key} {...{ [forte]: true }}>
          <Sprite icon={key.toLowerCase()} />
        </SocialMediaCircle>
      );
    });
    return mediaArray;
  };

  render() {
    return <SocialMediaContainer>{this.setSocialMedia()}</SocialMediaContainer>;
  }
}
