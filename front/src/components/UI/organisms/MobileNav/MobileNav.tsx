import React from "react";
import styled from "@emotion/styled";

import NavList from "@molecules/NavList";
import CloseIcon from "@icons/CloseIcon";
import Overlay from "./Overlay";
import NavFooter from "./NavFooter";

export interface MenuProps {
  openMenu: () => void;
  navState: boolean;
}

const StyledNav = styled.div<{ navState: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
    position: fixed;
    top: 0;
    right: ${({ navState }) => (navState ? 0 : "-200px")};

    transition: right 0.15s linear;

    height: 100vh;
    z-index: 100;

    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

    box-shadow: 1px 0 6px #000;

    & #close_box {
      cursor: pointer;
      padding: 10px;
      margin-bottom: 10px;
      & svg {
        width: 20px;
        height: 20px;
        transition: all 0.3s ease-in-out 0s;
        fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
        &:hover {
          fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
        }
      }
    }
  }
`;

const MobileNav = ({ openMenu, navState }: MenuProps) => {
  return (
    <>
      <Overlay openMenu={openMenu} navState={navState} />
      <StyledNav navState={navState}>
        <div id="close_box" onClick={openMenu}>
          <CloseIcon />
        </div>
        <NavList />
        <NavFooter />
      </StyledNav>
    </>
  );
};

export default React.memo(MobileNav);
