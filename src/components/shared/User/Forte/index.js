import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styles";
import Sprite from "../../Sprite/";

const Forte = ({ forte, Container, overrideStyles }) => (
  <Container className={overrideStyles && "override"} {...{ [forte]: true }}>
    <Sprite icon={forte} />
  </Container>
);

Forte.propTypes = {
  Container: PropTypes.func
};

Forte.defaultProps = {
  Container
};

export default Forte;
