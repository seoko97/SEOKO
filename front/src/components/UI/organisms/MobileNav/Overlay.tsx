import React from "react";
import styled from "@emotion/styled";
import { MenuProps } from "./MobileNav";

const StyledOverlay = styled.div<{ navState: boolean }>`
  display: ${({ navState }) => (navState ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR_RGBA};
  z-index: 2;
`;

const Overlay = ({ navState, openMenu }: MenuProps) => (
  <StyledOverlay onClick={openMenu} navState={navState} />
);

export default React.memo(Overlay);
