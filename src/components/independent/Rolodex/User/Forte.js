import React from "react";
import styled from "styled-components";
import { Container as FC } from "../../../shared/User/Forte/styles";
import Forte from "../../../shared/User/Forte/";

const ForteContainer = styled(FC)`
  &.override {
    width: 40rem;
    padding: 2rem;
    > svg {
      height: 10rem;
      width: 10rem;
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
