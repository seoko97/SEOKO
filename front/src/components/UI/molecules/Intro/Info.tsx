import React from "react";
import styled from "@emotion/styled";
import GItHubIcon from "@icons/GItHubIcon";
import MailIcon from "@icons/MailIcon";
import FacebookIcon from "@icons/FacebookIcon";
import InstagramIcon from "@icons/InstagramIcon";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  & svg {
    width: 24px;
    height: 24px;
    transition: fill 0.3s;
    fill: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }
`;

const Info = () => {
  return (
    <Container>
      <a href="https://github.com/seoko97" target="_blank" rel="noreferrer">
        <GItHubIcon />
      </a>
      <a href="mailto:seokoji97@gmail.com" target="_blank" rel="noreferrer">
        <MailIcon />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=100002987223791"
        target="_blank"
        rel="noreferrer"
      >
        <FacebookIcon />
      </a>
      <a href="https://www.instagram.com/sukho1007" target="_blank" rel="noreferrer">
        <InstagramIcon />
      </a>
    </Container>
  );
};

export default Info;
