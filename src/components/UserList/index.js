import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: papayawhip;
  display: flex;
  flex-direction: column;
  > * {
    font-size: 1.6rem;
    color: palevioletred;
  }
`;

class UserList extends React.Component {
  render() {
    const { users } = this.props;
    return (
      <Wrapper>
        {users.map(({ email }) => (
          <div key={email}>{email}</div>
        ))}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(UserList);
