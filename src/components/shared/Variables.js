import React from "react";
import styled, { keyframes } from "styled-components";

export const MAP_PADDING = "2rem";

export const COLORS = {
  mustard: "#F9DC5C",
  sky: "#00C7FF",
  strawberry: "#FF6B97",
  gunmetal: "#242D3C",
  timberwolf: "#D9D8D7"
};

export const FORTE_PROP_BG = styled.div`
  ${({ visionary }) => visionary && `background: ${COLORS.mustard}`};
  ${({ engineer }) => engineer && `background: ${COLORS.sky}`};
  ${({ artist }) => artist && `background: ${COLORS.strawberry}`};
  ${({ tbd }) => tbd && `background: ${COLORS.timberwolf}`};
`;
