import React from "react";
import styled from "styled-components";

import SocialMedia from "./SocialMedia";
import { COLORS } from "../../shared/Variables";

const InfoWrap = styled.div`
  color: ${COLORS.gunmetal};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const Name = styled.h1`
  font-size: 1.6rem;
`;

const Info = props => (
  <InfoWrap>
    <Name style={{ marginTop: "auto" }}>{props.name.first}</Name>
    <Name>{props.name.last}</Name>
    <SocialMedia {...props} />
  </InfoWrap>
);

export default Info;
