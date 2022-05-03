import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import styled from "@emotion/styled";
import MenuIcon from "@icons/MenuIcon";
import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
import { userInfoVar } from "@store/userInfo";
import UserAvatar from "@molecules/UserAvatar";
import Nav from "@molecules/Nav";
import NavList from "@molecules/NavList";
import UserNavList from "@molecules/NavList/UserNavList";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  & div {
    cursor: pointer;
  }

  & svg {
    fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    cursor: pointer;
    transition: fill 0.3s;
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }
`;

const MenuBox = () => {
  const router = useRouter();
  const userNavRef = useRef(null);
  const navRef = useRef(null);
  const [isActiveUserMenu, setIsActiveUserMenu] = useDetectOutsideClick(userNavRef, false);
  const [isActiveMenu, setIsActiveMenu] = useDetectOutsideClick(navRef, false);
  const { username } = useReactiveVar(userInfoVar);

  const userMenuHandler = useCallback(() => {
    setIsActiveUserMenu(!isActiveUserMenu);
  }, [isActiveUserMenu]);

  const menuHandler = useCallback(() => {
    setIsActiveMenu(!isActiveMenu);
  }, [isActiveMenu]);

  useEffect(() => {
    setIsActiveMenu(false);
    setIsActiveUserMenu(false);
  }, [router.pathname]);

  return (
    <Container>
      {username && (
        <>
          <UserAvatar width={30} height={30} onClick={userMenuHandler} />
          <Nav ref={userNavRef} isActive={isActiveUserMenu}>
            <UserNavList />
          </Nav>
        </>
      )}
      <MenuIcon menuHandler={menuHandler} />
      <Nav ref={navRef} isActive={isActiveMenu}>
        <NavList username={username} />
      </Nav>
    </Container>
  );
};

export default MenuBox;
