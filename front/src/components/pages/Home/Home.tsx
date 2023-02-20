import React from "react";

import RowFrame from "@frames/RowFrame";
import Intro from "@molecules/Intro";

import styled from "@emotion/styled";
import MainContent from "@organisms/MainContent";

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  return (
    <Container>
      <Intro />
      <MainContent />
    </Container>
  );
};

export default Home;
