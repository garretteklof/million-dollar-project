import React from "react";
import styled from "styled-components";

import Sprite from "../../shared/Sprite/";

import { COLORS } from "../../shared/Variables";

const ForteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 4rem;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  ${({ visionary }) => visionary && `background: ${COLORS.mustard}`};
  ${({ engineer }) => engineer && `background: ${COLORS.sky}`};
  ${({ artist }) => artist && `background: ${COLORS.strawberry}`};
  ${({ tbd }) => tbd && `background: ${COLORS.timberwolf}`};
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
