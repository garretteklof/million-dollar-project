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
  ${({ visionary }) => visionary && `background: ${COLORS.pumpkin}`};
  ${({ engineer }) => engineer && `background: ${COLORS.mustard}`};
  ${({ artist }) => artist && `background: ${COLORS.strawberry}`};
  ${({ tbd }) => tbd && `background: ${COLORS.timberwolf}`};
`;
const ForteIcon = styled.svg`
  height: 3rem;
  width: 3rem;
`;

const setForte = forte => {
  switch (forte) {
    case "visionary":
      return { visionary: true };
    case "engineer":
      return { engineer: true };
    case "artist":
      return { artist: true };
    case "tbd":
      return { tbd: true };
  }
};

const Forte = ({ forte }) => (
  <ForteContainer {...setForte(forte)}>
    <ForteIcon>
      <use xlinkHref={`/images/sprite.svg#icon-${forte}`} />
    </ForteIcon>
  </ForteContainer>
);

export default Forte;
