import React from "react";
import styled from "@emotion/styled";

import ParallaxForm from "@molecules/ParallaxForm";
import PageContent from "@molecules/PageContent";

const StyledDiv = styled.div`
  width: 100%;
  height: 300px;
`;

const Home = () => {
  return (
    <>
      <ParallaxForm imgSrc="/main.jpg">
        <h2>Main</h2>
        <p>SEOKO's blog</p>
      </ParallaxForm>
      <PageContent>
        <StyledDiv>asd</StyledDiv>
        <StyledDiv>asd</StyledDiv>
        <StyledDiv>asd</StyledDiv>
        <StyledDiv>asd</StyledDiv>
        <StyledDiv>asd</StyledDiv>
      </PageContent>
    </>
  );
};

export default Home;
