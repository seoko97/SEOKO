import React from "react";
import styled from "@emotion/styled";

import RowFrame from "@frames/RowFrame";
import Intro from "@molecules/Intro";

import HomeContainer from "./HomeContainer";

export interface PostProps {
  id: number;
  category: string;
  title: string;
  content: string;
  titleImage: string;
  tags: string[];
}

const StyledHome = styled(RowFrame)`
  padding-top: 30px;
`;

const Home = () => {
  return (
    <StyledHome>
      <Intro />
      <HomeContainer />
    </StyledHome>
  );
};

export default Home;
