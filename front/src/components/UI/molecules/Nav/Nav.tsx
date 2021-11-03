import React from "react";
import styled from "@emotion/styled";
import NavList from "@molecules/NavList";

const StyledNav = styled.div`
  display: flex;

  & > ul {
    display: flex;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    display: none;
  }
`;

const Nav = () => {
  return (
    <>
      <StyledNav>
        <NavList />
      </StyledNav>
    </>
  );
};

export default Nav;
