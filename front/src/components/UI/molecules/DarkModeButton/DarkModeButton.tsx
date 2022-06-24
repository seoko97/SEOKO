import React from "react";
import styled from "@emotion/styled";
import SunIcon from "@icons/SunIcon";
import MoonIcon from "@icons/MoonIcon";

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

  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.THIRDARY_COLOR};
  border-radius: 40px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.4);

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  transition: background-color 0.3s, transform 0.3s;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;

    & svg {
      width: 24px;
      height: 24px;
      fill: #ccc;
      transition: fill 0.3s;
    }
  }

  &:hover {
    transform: scale(1.1);

    & > div {
      & svg {
        fill: #ffd500;
      }
    }
  }
`;

const DarkModeButton = ({ mode, onClick }: Props) => {
  return (
    <>
      <StyledDarkModeButton onClick={onClick}>
        <div>{mode && mode === "light" ? <SunIcon /> : <MoonIcon />}</div>
      </StyledDarkModeButton>
    </>
  );
};

export default DarkModeButton;
