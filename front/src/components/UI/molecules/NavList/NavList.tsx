import React from "react";
import NavItem from "@atoms/NavItem";

const NavList = () => (
  <ul>
    <NavItem emoji="🏠" name="HOME" href="/" />
    <NavItem emoji="✍🏻" name="POST" href="/post" />
    <NavItem emoji="📚" name="PORTFOLIO" href="/portfolio" />
    <NavItem emoji="🚶‍♂️" name="ABOUT" href="/about" />
  </ul>
);

export default NavList;
