import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Logo from "@atoms/Logo";
import RowFrame from "@frames/RowFrame";
import { css } from "@emotion/react";

interface Props {
  scrollPosition: number;
}

const StyledHeader = styled.header<Props>`
  width: 100%;
  position: sticky;
  top: -32px;
  padding-top: 32px;
  transition: all 0.25s ease-in-out 0s;

  ${({ scrollPosition, theme }) =>
    scrollPosition >= 400 &&
    css`
      box-shadow: rgb(0 0 0 / 8%) 0px 0px 15px;
      background: ${theme.BAKCGROUND_COLOR.PRIMARY_COLOR_RGBA};
    `};

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    & div:first-of-type {
      & a {
        ${({ scrollPosition }) =>
          scrollPosition <= 400 &&
          css`
            color: #f8f9fa;
          `}
      }
    }
  }
`;

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition);

  useEffect(() => {
    const layoutRef = document.body;

    function handleScroll() {
      // console.log(
      //   layoutRef.scrollHeight,
      //   layoutRef.scrollTop + layoutRef.clientHeight,
      //   layoutRef.scrollHeight - 300,
      // );
      setScrollPosition(layoutRef.scrollTop);
    }
    layoutRef?.addEventListener("scroll", handleScroll);
    return () => layoutRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StyledHeader scrollPosition={scrollPosition}>
        <RowFrame>
          {/* 로고 */}
          <Logo />
          {/* 네비게이션 */}
          <div>asdasd</div>
        </RowFrame>
      </StyledHeader>
    </>
  );
};

export default React.memo(Header);
