import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Logo from "@atoms/Logo";
import RowFrame from "@frames/RowFrame";
import MenuBox from "@molecules/MenuBox";

const Container = styled.header`
  width: 100%;
  position: sticky;
  top: -32px;
  padding-top: 32px;
  z-index: 100;
  transition: box-shadow 0.15s, backdrop-filter 0.3s, background-color 0.3s;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  &.fixed {
    box-shadow: rgb(0 0 0 / 8%) 0px 0px 8px;
  }

  backdrop-filter: blur(3px);
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.PRIMARY_COLOR_RGBA};

  & a {
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }
`;

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = window.scrollY || document.documentElement.scrollTop;

      if (scrollHeight >= 32) setIsFixed(true);
      else setIsFixed(false);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <Container className={isFixed ? "fixed" : ""}>
      <RowFrame>
        <Logo />
        <MenuBox />
      </RowFrame>
    </Container>
  );
};

export default Header;
