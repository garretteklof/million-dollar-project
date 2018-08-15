import React from "react";
import styled from "styled-components";

import UserMap from "./UserMap/";

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  display: grid;
  gird-template-columns: 1fr min-content;
`;
export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <UserMap />
      </Container>
    );
  }
}
