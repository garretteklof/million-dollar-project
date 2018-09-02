import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../../../actions/auth";
import { callLogout } from "../../../api/auth";

const LogoutButton = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  font-size: 2rem;
  cursor: pointer;
`;

class Logout extends React.Component {
  onLogout = async () => {
    const token = sessionStorage.getItem("x-auth-token");
    await callLogout(token);
    sessionStorage.removeItem("x-auth-token");
    this.props.logoutUser();
    this.props.history.push("/login");

    await axios.get("/mongo-seed-data");
  };
  render() {
    const { className } = this.props; // for styled-components
    return (
      <LogoutButton className={className} onClick={this.onLogout}>
        Logout
      </LogoutButton>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(Logout)
);
