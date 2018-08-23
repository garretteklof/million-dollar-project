import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import SocialMedia from "./SocialMedia";
import Forte from "./Forte";
import { callGetUser } from "../../../../api/users";

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

export default class User extends React.Component {
  state = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    avatar: null,
    forte: null,
    socialMedia: null
  };

  componentDidMount() {
    this.setUser();
  }

  setUser = async () => {
    const token = localStorage.getItem("x-auth-token");
    const { data } = await callGetUser(this.props.match.params.id, token);
    const { _id, name, email, avatar, forte, socialMedia } = data;
    this.setState({
      id: _id,
      firstName: name.first,
      lastName: name.last,
      email,
      avatar,
      forte,
      socialMedia
    });
  };

  render() {
    const { forte, socialMedia, avatar, firstName, lastName } = this.state;
    return (
      <Grid>
        <Avatar {...{ avatar, firstName, lastName }} />
        <SocialMedia {...{ forte, socialMedia }} />
        <Info>
          <Name>{this.state.firstName + " " + this.state.lastName}</Name>
          <Forte {...{ forte }} />
        </Info>
      </Grid>
    );
  }
}
