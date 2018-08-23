import React from "react";
import PropTypes from "prop-types";
import { Container, SpriteShape } from "./styles";
import Sprite from "../../Sprite/";

export default class SocialMedia extends React.Component {
  static propTypes = {
    SpriteShape: PropTypes.func,
    Container: PropTypes.func
  };

  static defaultProps = {
    SpriteShape,
    Container
  };

  setSocialMedia = () => {
    const { forte, socialMedia, SpriteShape, isLink } = this.props;
    let mediaArray = [];
    if (socialMedia) {
      Object.entries(socialMedia).forEach(([key, value]) => {
        let linked;
        isLink ? (linked = { target: "_blank", href: value }) : (linked = {});
        mediaArray.push(
          <SpriteShape key={key} {...{ [forte]: true }} {...linked}>
            <Sprite icon={key.toLowerCase()} />
          </SpriteShape>
        );
      });
    }
    return mediaArray;
  };

  render() {
    const { Container, overrideStyles } = this.props;
    return (
      <Container className={overrideStyles && `override`}>
        {this.setSocialMedia()}
      </Container>
    );
  }
}
