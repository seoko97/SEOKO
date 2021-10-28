import React, { useCallback } from "react";
import { useCookies } from "react-cookie";
import styled from "@emotion/styled";

interface Props {
  mode: string;
  onClick: () => void;
}

const StyledDarkModeButton = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border: 1px solid #ccc;
  border-radius: 50%;
`;

const DarkModeButton = ({ mode, onClick }: Props) => {
  return (
    <>
      <StyledDarkModeButton onClick={onClick}>
        {mode && <div>{mode}</div>}
      </StyledDarkModeButton>
    </>
  );
};

export default DarkModeButton;
