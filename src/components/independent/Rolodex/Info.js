import React from "react";
import styled from "styled-components";

import SocialMedia from "./SocialMedia";
import { COLORS } from "../../shared/Variables";

const InfoWrap = styled.div`
  color: ${COLORS.gunmetal};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const UserName = styled.h1`
  font-size: 1.6rem;
  /* margin-bottom: auto; */
`;

const Info = ({ name }) => (
  <InfoWrap>
    <UserName>{`${name.first} ${name.last}`}</UserName>
    <SocialMedia />
  </InfoWrap>
);

export default Info;
