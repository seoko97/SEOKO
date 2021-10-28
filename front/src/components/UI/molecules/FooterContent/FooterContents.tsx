import React from "react";
import styled from "@emotion/styled";
import GitHubIcon from "@icons/GItHubIcon/GitHubIcon";
import Logo from "../../atoms/Logo";

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
    fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
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
              href="https://www.instagram.com/sukho1007/"
              about="instagram"
              target="_blank"
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
