import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

const StyledLoader = styled.aside`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12rem;
  color: palevioletred;
  background: ${rgba("papayawhip", 0.5)};
`;

const Loader = props => (
  <StyledLoader {...props}>{props.children}</StyledLoader>
);

export default Loader;
