import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  cursor: pointer;
  color: palevioletred;
  font-size: 2em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

const Button = props => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default Button;
