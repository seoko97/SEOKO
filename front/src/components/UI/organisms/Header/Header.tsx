import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Logo from "@atoms/Logo";
import RowFrame from "@frames/RowFrame";
import Nav from "@organisms/Nav";
import MenuIcon from "@icons/MenuIcon";

interface Props {
  scrollPosition: number;
  pathname: string;
}

const StyledHeader = styled.header<Props>`
  width: 100%;
  position: sticky;
  top: -32px;
  padding-top: 32px;
  transition: all 0.25s ease-in-out 0s;
  z-index: 1;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  /* box-shadow: rgb(0 0 0 / 8%) 0px 0px 15px; */

  ${({ theme }) => css`
    background: ${theme.BAKCGROUND_COLOR.PRIMARY_COLOR_RGBA};
    backdrop-filter: blur(2px);
    & a {
      color: ${theme.FONT_COLOR.PRIMARY_COLOR};
    }
    & svg {
      fill: ${theme.FONT_COLOR.PRIMARY_COLOR};
    }
  `}
`;

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navState, setNavState] = useState(false);
  const [pathName, setPathName] = useState("");
  const router = useRouter();

  const openMenu = useCallback(() => {
    setNavState(!navState);
  }, [navState]);

  useEffect(() => {
    setPathName(router.pathname);
    const layoutRef = document.body;

    const handleScroll = () => setScrollPosition(layoutRef.scrollTop);

    layoutRef?.addEventListener("scroll", handleScroll);
    return () => layoutRef?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (router.pathname !== pathName) {
      setPathName(router.pathname);
      setNavState(false);
    }
  }, [router.pathname, pathName]);

  return (
    <>
      <StyledHeader scrollPosition={scrollPosition} pathname={router.pathname}>
        <RowFrame>
          <Logo />
          <div onClick={openMenu} id="menu_button">
            <MenuIcon />
          </div>
        </RowFrame>
      </StyledHeader>
      <Nav menuController={openMenu} navState={navState} />
    </>
  );
};

export default React.memo(Header);
