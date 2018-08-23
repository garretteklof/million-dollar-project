import React from "react";
import { connect } from "react-redux";
import { Flipper } from "react-flip-toolkit";
import styled from "styled-components";
import Card from "./Card/";

import { fetchUsersInSurroundingArea } from "../../../selectors/users";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2rem;
  grid-gap: 2rem;
  justify-content: center;
  align-content: start;
`;

const GridOfCards = ({ users, ...rest }) => (
  <Flipper flipKey={users.length}>
    <Wrapper>
      {console.log("User Count: " + users.length)}
      {users.map(user => (
        <Card key={user._id} {...user} {...rest} />
      ))}
    </Wrapper>
  </Flipper>
);

const mapStateToProps = ({ users, map }) => ({
  users: fetchUsersInSurroundingArea(users, map.bounds)
});

export default connect(mapStateToProps)(GridOfCards);
