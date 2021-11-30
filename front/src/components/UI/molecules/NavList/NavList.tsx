import React from "react";
import NavItem from "@atoms/NavItem";

const NavList = () => (
  <ul>
    <NavItem name="HOME" href="/" />
    <NavItem name="POST" href="/post" />
    <NavItem name="PORTFOLIO" href="/portfolio" />
    <NavItem name="ABOUT" href="/about" />
  </ul>
);

export default React.memo(NavList);
