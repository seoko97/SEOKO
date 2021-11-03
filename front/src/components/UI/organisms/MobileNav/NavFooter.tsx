import styled from "@emotion/styled";
import React from "react";
import GitHubIcon from "@icons/GItHubIcon";

const StyledNavFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  & svg {
    width: 35px;
    height: 35px;
    cursor: pointer;
    fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

    transition: fill 0.1s ease-in-out 0s;
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }
`;

const NavFooter = () => (
  <StyledNavFooter>
    <a
      href="https://github.com/seoko97"
      about="instagram"
      target="_blank"
      rel="noreferrer"
    >
      <GitHubIcon />
    </a>
  </StyledNavFooter>
);

export default NavFooter;
