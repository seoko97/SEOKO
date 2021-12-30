import React from "react";
import styled from "@emotion/styled";
import { MenuProps } from "./Nav";

// interface IProps {}

const StyledOverlay = styled.div<{ navState: boolean }>`
  display: ${({ navState }) => (navState ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const Overlay = ({ navState, menuController }: MenuProps) => (
  <StyledOverlay onClick={menuController} navState={navState} />
);

export default React.memo(Overlay);
