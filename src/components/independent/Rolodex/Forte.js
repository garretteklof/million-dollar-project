import React from "react";
import styled from "styled-components";

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
`;
const ForteIcon = styled.svg`
  height: 3rem;
  width: 3rem;
`;

const Forte = ({ forte }) => (
  <ForteContainer {...{ [forte]: true }}>
    <ForteIcon>
      <use xlinkHref={`/images/sprite.svg#icon-${forte}`} />
    </ForteIcon>
  </ForteContainer>
);

export default Forte;
