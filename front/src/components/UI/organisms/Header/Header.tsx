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
  z-index: 1;
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

  ${({ theme }) => `
    background-color: ${theme.BAKCGROUND_COLOR.PRIMARY_COLOR_RGBA};
    backdrop-filter: blur(3px);
    & a {
      color: ${theme.FONT_COLOR.PRIMARY_COLOR};
    }
  `}
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
