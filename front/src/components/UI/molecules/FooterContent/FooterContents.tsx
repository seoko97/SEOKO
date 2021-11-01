import React from "react";
import styled from "@emotion/styled";
import Logo from "@atoms/Logo";
import GitHubIcon from "@icons/GItHubIcon";

const StyledFooterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  & svg {
    width: 42px;
    height: 42px;
    transition: all 0.15s ease-in-out 0s;
    fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }

  & > div {
    margin-bottom: 20px;
    display: flex;
    gap: 50px;
  }
  & > p {
    color: #6c757d !important;
  }
`;

const FooterContent = () => {
  return (
    <>
      <StyledFooterContent>
        <div>
          <Logo />
          <span>
            <a
              href="https://github.com/seoko97"
              about="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>
          </span>
        </div>
        <p>Copyright © SEOKO 2021</p>
      </StyledFooterContent>
    </>
  );
};

export default FooterContent;
