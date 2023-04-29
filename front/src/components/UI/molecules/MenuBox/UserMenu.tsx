import React, { useRef } from "react";
import Nav from "@molecules/Nav";
import NavList from "@molecules/NavList/UserNavList";
import UserInfo from "@molecules/UserInfo";
import useDetectOutsideClick from "@hooks/useDetectOutsideClick";

const UserMenu = () => {
  const userNavRef = useRef(null);

  const [isActive, activeHandler] = useDetectOutsideClick(userNavRef, false);

  return (
    <>
      <UserInfo onClick={activeHandler} />
      <Nav isActive={isActive} ref={userNavRef}>
        <NavList />
      </Nav>
    </>
  );
};

export default UserMenu;
