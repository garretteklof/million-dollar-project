import React from "react";
import styled from "styled-components";
import Login from "../../shared/Login/";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = props => (
  <Container>
    <Login {...props} />
  </Container>
);

export default LoginPage;
