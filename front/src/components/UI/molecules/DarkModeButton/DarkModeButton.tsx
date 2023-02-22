import React from "react";
import styled from "@emotion/styled";
import SunIcon from "@icons/SunIcon";
import MoonIcon from "@icons/MoonIcon";

interface Props {
  mode: string;
  onClick: () => void;
}

const StyledDarkModeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  right: 30px;
  bottom: 30px;

  width: 40px;
  height: 40px;

  z-index: 50;
  cursor: pointer;

  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.THIRDLY_COLOR};
  box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 50%;

  & > svg {
    width: 24px;
    height: 24px;
    fill: #ccc;
    transition: fill 0.3s;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.EFFECT};
    & > svg {
      fill: #ffd500;
    }
  }
`;

const DarkModeButton = ({ mode, onClick }: Props) => {
  return (
    <StyledDarkModeButton onClick={onClick}>
      {mode && mode === "light" ? <SunIcon /> : <MoonIcon />}
    </StyledDarkModeButton>
  );
};

export default DarkModeButton;
