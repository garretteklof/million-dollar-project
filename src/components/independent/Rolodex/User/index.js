import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import SocialMedia from "./SocialMedia";
import Forte from "./Forte";

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const Info = styled.div`
  grid-column: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Name = styled.h1`
  font-size: 2rem;
`;

const User = ({ name = { first: "", last: "" }, ...rest }) => (
  <Grid>
    <Avatar {...name} {...rest} />
    <SocialMedia {...rest} />
    <Info>
      <Name>{name.first + " " + name.last}</Name>
      <Forte {...rest} />
    </Info>
  </Grid>
);

export default User;
