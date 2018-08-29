import React from "react";
import styled from "styled-components";
import AvatarBox from "./Avatar";
import Forte from "./Forte";

const Grid = styled.div`
  display: grid;
  grid-template-columns: min-content;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  grid-row-gap: 1rem;
`;

const Name = styled.h1`
  font-size: 3rem;
`;

const User = ({ name = { first: "", last: "" }, ...rest }) => (
  <Grid>
    <AvatarBox {...name} {...rest} />
    <Name>{name.first + " " + name.last}</Name>
    <Forte {...rest} />
  </Grid>
);

export default User;
