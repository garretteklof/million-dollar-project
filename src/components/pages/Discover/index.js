import React from "react";
import styled from "styled-components";
import Navbar from "../../shared/Navbar/";
import GoogleMap from "../../independent/GoogleMap/";
import Rolodex from "../../independent/Rolodex/";

import { MAP_PADDING } from "../../shared/Variables";

const Container = styled.div`
  padding: ${MAP_PADDING};
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
`;

const DisNavbar = styled(Navbar)`
  grid-column: 1 / -1;
`;
const DiscoverPage = props => (
  <Container>
    <DisNavbar {...props} />
    <GoogleMap {...props} />
    <Rolodex {...props} />
  </Container>
);

export default DiscoverPage;
