import React from "react";
import styled from "@emotion/styled";

import NavList from "@molecules/NavList";
import CloseIcon from "@icons/CloseIcon";
import Overlay from "./Overlay";
import NavFooter from "./NavFooter";

export interface MenuProps {
  menuController: () => void;
  navState: boolean;
}

const StyledNav = styled.div<{ navState: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 70%;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  position: fixed;
  top: 0;
  right: ${({ navState }) => (navState ? 0 : "-300px")};

  transition: right 0.15s linear;

  height: 100vh;
  z-index: 100;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  & #close_box {
    cursor: pointer;
    padding: 20px 15px;
    margin-bottom: 10px;
    & svg {
      width: 15px;
      height: 15px;
      transition: fill 0.2s ease-in-out 0s;
      fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
      &:hover {
        fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
      }
    }
  }
`;

const Nav = ({ navState, menuController }: MenuProps) => {
  return (
    <>
      <Overlay navState={navState} menuController={menuController} />
      <StyledNav navState={navState}>
        <div id="close_box" onClick={menuController}>
          <CloseIcon />
        </div>
        <NavList />
        <NavFooter />
      </StyledNav>
    </>
  );
};

export default React.memo(Nav);
