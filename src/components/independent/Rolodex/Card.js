import React from "react";
import { Flipped } from "react-flip-toolkit";
import styled from "styled-components";
import { rgba } from "polished";

import { COLORS } from "../../shared/Variables";

import Avatar from "./Avatar";
import Info from "./Info";
import Forte from "./Forte";

const StyledCard = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1rem 2rem ${rgba("black", 0.1)};
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-column-gap: 0.75rem;
`;

const Card = ({ _id, name, avatar, forte, socialMedia }, ...rest) => (
  <Flipped flipId={_id} spring="stiff">
    <StyledCard {...rest}>
      <Avatar {...{ avatar, name }} />
      <Info {...{ name, socialMedia, forte }} />
      <Forte {...{ forte }} />
    </StyledCard>
  </Flipped>
);

export default Card;
