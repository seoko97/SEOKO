import React from "react";
import styled from "@emotion/styled";
import UserAvatar from "../UserAvatar";
import IntroInner from "./IntroInner";

const Container = styled.div`
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
  position: relative;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 32px 0 48px;

    width: 100%;
    gap: 15px;
    flex-direction: column;
  }
`;

const Intro = () => {
  return (
    <Container>
      <UserAvatar width={150} height={150} />
      <IntroInner />
    </Container>
  );
};

export default Intro;
