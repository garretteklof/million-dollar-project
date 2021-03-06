import React from "react";
import styled from "styled-components";
import { Container as FC } from "../../../shared/User/Forte/styles";
import Forte from "../../../shared/User/Forte/";

const ForteContainer = styled(FC)`
  &.override {
    height: 4rem;
    > svg {
      height: 3rem;
      width: 3rem;
    }
  }
`;

const UserForte = ({ forte }) => (
  <Forte
    {...{
      forte,
      Container: ForteContainer,
      overrideStyles: true
    }}
  />
);

export default UserForte;
