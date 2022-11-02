import React from "react";
import styled from "@emotion/styled";

import MainContent from "./MainContent";

const Container = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: 100% 250px;
  gap: 4em;
  margin-bottom: 3.5em;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    display: block;
    & > div:first-of-type {
      width: 100%;
    }
  }
`;

const HomeContent = () => {
  return (
    <Container>
      <MainContent />
    </Container>
  );
};

export default HomeContent;
