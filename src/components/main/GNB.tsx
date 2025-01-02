import React from "react";
import { styled } from "styled-components";

const Header = styled.header`
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  width: 100%;
  padding: 1.5625rem 7.1875rem;
  justify-content: center;
  align-items: center;
`

const Nav = styled.nav`
  width: 100%;
  max-width: 82.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function GNB() {
  return (
    <Header>
      <Nav>
        <img src="svgs/logo-with-text.svg" alt="" />
        <img src="svgs/student-my.svg" alt="" />
      </Nav>
    </Header>
  )
}

export default GNB;