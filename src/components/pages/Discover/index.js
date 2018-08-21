import React from "react";
import styled from "styled-components";

import GoogleMap from "../../independent/GoogleMap/";
import Rolodex from "../../independent/Rolodex/";

import { MAP_PADDING } from "../../shared/Variables";

const Container = styled.div`
  padding: ${MAP_PADDING};
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const DiscoverPage = props => (
  <Container>
    <GoogleMap {...props} />
    <Rolodex {...props} />
  </Container>
);

export default DiscoverPage;
