import React from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { COLORS } from "../Variables";

const StyledButton = styled.button`
  cursor: pointer;
  color: palevioletred;
  font-size: 2rem;
  padding: 1rem 2rem;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
  ${props =>
    props.chat &&
    css`
      position: relative;
      color: white;
      border: none;
      font-size: 0;
      padding: 0;
      height: 8rem;
      width: 8rem;
      border-radius: 100%;
      background: linear-gradient(
        to right,
        ${COLORS.turquoise},
        ${COLORS.eucalyptus}
      );
      > svg {
        fill: white;
        height: 4.5rem;
        width: 4.5rem;
      }
    `};
`;

const Button = props => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default Button;
