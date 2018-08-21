import React from "react";
import styled from "styled-components";

import Sprite from "../../shared/Sprite/";

import { FORTE_PROP_BG } from "../../shared/Variables";

const ForteContainer = FORTE_PROP_BG.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 4rem;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  > svg {
    height: 3rem;
    width: 3rem;
  }
`;

const Forte = ({ forte }) => (
  <ForteContainer {...{ [forte]: true }}>
    <Sprite icon={forte} />
  </ForteContainer>
);

export default Forte;
