import React from "react";
import NavItem from "@atoms/NavItem";
import { Container } from "./UserNavList";

interface IProps {
  username: string | null;
}

const NavList = ({ username }: IProps) => (
  <Container>
    <NavItem name="홈" href="/" />
    <NavItem name="태그" href="/tag" />
    <NavItem name="ABOUT" href="/about" />
    {!username && <NavItem name="로그인" href="/signin" />}
  </Container>
);

export default NavList;
