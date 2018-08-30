import React from "react";
import styled, { keyframes } from "styled-components";

export const MAP_PADDING = "2rem";

export const COLORS = {
  mustard: "#F9DC5C",
  sky: "#00C7FF",
  strawberry: "#FF6B97",
  gunmetal: "#242D3C",
  timberwolf: "#D9D8D7",
  turquoise: "#00fddc",
  eucalyptus: "#40f99b"
};

export const FORTE_PROP_BG = ({ visionary, engineer, artist, tbd }) => {
  if (visionary) return visionary && `background: ${COLORS.mustard}`;
  else if (engineer) return engineer && `background: ${COLORS.sky}`;
  else if (artist) return artist && `background: ${COLORS.strawberry}`;
  else return tbd && `background: ${COLORS.timberwolf}`;
};
