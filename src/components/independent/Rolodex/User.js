import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  height: 100%;
  width: 100%;
`;

const User = props => (
  <Wrapper>
    <Link to="/discover">Discover</Link>I am user {props.match.params.id}
  </Wrapper>
);

export default User;
