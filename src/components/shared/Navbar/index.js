import React from "react";
import styled from "styled-components";
import Logout from "../Logout/";

const Nav = styled.nav`
  width: 100%;
  height: 6rem;
`;
const InnerNav = styled.div`
  padding: 2rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavLogout = styled(Logout)`
  margin-left: auto;
`;

const Navbar = ({ className }) => (
  <Nav className={className}>
    <InnerNav>
      <NavLogout />
    </InnerNav>
  </Nav>
);

export default Navbar;
