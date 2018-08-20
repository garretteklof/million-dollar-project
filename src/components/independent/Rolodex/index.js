import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Card from "./Card";

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

class UserList extends React.Component {
  render() {
    const { users } = this.props;
    console.log("User Count: " + users.length);
    return (
      <Wrapper>
        {users.map(user => (
          <Card key={user._id} {...user} />
        ))}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ users, map }) => ({
  users: fetchUsersInSurroundingArea(users, map.bounds)
});

export default connect(mapStateToProps)(UserList);
