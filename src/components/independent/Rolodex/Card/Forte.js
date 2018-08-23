import React from "react";
import styled from "styled-components";
import Forte from "../../../shared/User/Forte/";
import { Container as FC } from "../../../shared/User/Forte/styles";

const CFC = styled(FC)`
  &.override {
    width: 4rem;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CardForte = ({ forte }) => (
  <Forte {...{ forte, Container: CFC, overrideStyles: true }} />
);

export default CardForte;
