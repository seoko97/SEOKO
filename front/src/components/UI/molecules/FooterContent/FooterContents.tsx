import React from "react";
import styled from "@emotion/styled";
import Logo from "@atoms/Logo";
import GitHubIcon from "@icons/GItHubIcon";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  & a > svg {
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
    <Container>
      <div>
        <Logo />
        <a href="https://github.com/seoko97" target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
      </div>
      <p>Copyright © SEOKO 2022</p>
    </Container>
  );
};

export default FooterContent;
