import React from "react";
import { Link } from "react-router-dom";
import { Flipped } from "react-flip-toolkit";
import styled from "styled-components";
import { rgba } from "polished";

import { COLORS } from "../../shared/Variables";

import Avatar from "./Avatar";
import Info from "./Info";
import Forte from "./Forte";

/* Having wrapper after Flipped allows for CSS transitions on StyledCard */
const FlipWrapLink = styled(Link)`
  text-decoration: none;
  position: relative;
  height: 100%;
  width: 100%;
`;

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-column-gap: 0.75rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1rem 2rem ${rgba("black", 0.1)};
  transition: all 0.2s;
  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 1.5rem 3rem ${rgba("black", 0.15)};
  }
  &:active,
  &:focus {
    transform: translateY(0);
    box-shadow: 0 1rem 2rem ${rgba("black", 0.1)};
  }
`;

const Card = ({ _id, name, avatar, forte, socialMedia }) => (
  <Flipped flipId={_id} spring="stiff">
    <FlipWrapLink to={`/user/${_id}`}>
      <StyledCard>
        <Avatar {...{ avatar, name }} />
        <Info {...{ name, socialMedia, forte }} />
        <Forte {...{ forte }} />
      </StyledCard>
    </FlipWrapLink>
  </Flipped>
);

export default Card;
