import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import User from "./User/";
import Chat from "../../shared/Chat/";

const Wrapper = styled.div`
  position: relative;
  padding: 2rem;
  height: 100%;
  width: 100%;
  > a {
    text-decoration: none;
    font-size: 2rem;
    color: inherit;
  }
`;

const UserSummary = props => (
  <Wrapper>
    <Link to="/discover">&larr;back</Link>
    <User {...props} />
    <Chat />
  </Wrapper>
);

export default UserSummary;
