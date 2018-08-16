import React from "react";
import styled from "styled-components";

import GoogleMap from "../../independent/GoogleMap/";
import Rolodex from "../../independent/Rolodex";

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <GoogleMap />
        <Rolodex />
      </Container>
    );
  }
}
