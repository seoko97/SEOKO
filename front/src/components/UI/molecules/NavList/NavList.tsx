import React from "react";
import NavItem from "@atoms/NavItem";

const NavList = () => (
  <ul>
    <NavItem name="홈" href="/" />
    <NavItem name="카테고리" href="/post" />
    <NavItem name="태그" href="/portfolio" />
    <NavItem name="ABOUT" href="/about" />
  </ul>
);

export default React.memo(NavList);
