import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import User from "./User/";
import Chat from "../../shared/Chat/";
import { callGetUser, callGetMe } from "../../../api/users";

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

export default class UserSummary extends React.Component {
  state = {
    userLoggedIn: null,
    userWithSummary: null
  };

  componentDidMount() {
    this.getUserWithSummary();
    this.getUserLoggedIn();
  }

  getUserWithSummary = async () => {
    const token = localStorage.getItem("x-auth-token");
    const { data } = await callGetUser(
      this.props.match.params.internalUrl,
      token
    );
    this.setState({ userWithSummary: data });
  };

  getUserLoggedIn = async () => {
    const token = localStorage.getItem("x-auth-token");
    const { data } = await callGetMe(token);
    this.setState({ userLoggedIn: data });
  };

  render() {
    const { userWithSummary } = this.state;
    return (
      <Wrapper>
        <Link to="/discover">&larr;back</Link>
        <User {...userWithSummary} />
        <Chat {...this.state} />
      </Wrapper>
    );
  }
}
