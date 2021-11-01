import React from "react";
import styled from "@emotion/styled";

interface Props {
  mode: string;
  onClick: () => void;
}

const StyledDarkModeButton = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 50;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border: 1px solid #ccc;
  border-radius: 50%;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
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
