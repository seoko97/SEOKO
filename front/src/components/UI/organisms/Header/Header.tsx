import React, { useLayoutEffect, useRef } from "react";
import styled from "@emotion/styled";

import Logo from "@atoms/Logo";
import RowFrame from "@frames/RowFrame";

const StyledHeader = styled.header`
  position: sticky;
  top: -32px;
  padding-top: 32px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;

    &::before {
      width: 100%;
      height: 100%;
      content: "";
      opacity: 0.7;
      background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
`;

const Header = () => {
  useLayoutEffect(() => {
    const layoutRef = document.body;

    function handleScroll() {
      console.log(
        layoutRef.scrollHeight,
        layoutRef.scrollTop + layoutRef.clientHeight,
        layoutRef.scrollHeight - 300,
      );
    }
    layoutRef?.addEventListener("scroll", handleScroll);
    return () => layoutRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StyledHeader>
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

export default Header;
