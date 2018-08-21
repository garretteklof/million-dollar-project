import React from "react";
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

const Card = props => (
  <StyledCard>
    <Avatar {...props} />
    <Info {...props} />
    <Forte {...props} />
  </StyledCard>
);

export default Card;
