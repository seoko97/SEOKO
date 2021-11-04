import React from "react";
import styled from "@emotion/styled";
import Logo from "@atoms/Logo";
import GitHubIcon from "@icons/GItHubIcon";
import UserAvatar from "@molecules/UserAvatar";

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
    transition: all 0.2s ease-in-out 0s;
    fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }

  & > div {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  & > p {
    color: #6c757d !important;
  }
  & a {
    max-height: 42px;
  }
`;

const FooterContent = () => {
  return (
    <>
      <StyledFooterContent>
        <div>
          <Logo />
          <a
            href="https://github.com/seoko97"
            about="instagram"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
          <UserAvatar />
        </div>
        <p>Copyright © SEOKO 2021</p>
      </StyledFooterContent>
    </>
  );
};

export default React.memo(FooterContent);
