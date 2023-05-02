import React, { useRef } from "react";
import MenuIcon from "@icons/MenuIcon";
import Nav from "@molecules/Nav";
import NavList from "@molecules/NavList";
import useDetectOutsideClick from "@hooks/useDetectOutsideClick";

interface IProps {
  username: string | null;
}

const Menu = ({ username }: IProps) => {
  const navRef = useRef(null);
  const [isActive, activeHandler] = useDetectOutsideClick(navRef, false);

  return (
    <div ref={navRef}>
      <div onClick={activeHandler}>
        <MenuIcon />
      </div>
      <Nav isActive={isActive}>
        <NavList username={username} />
      </Nav>
    </div>
  );
};

export default Menu;
