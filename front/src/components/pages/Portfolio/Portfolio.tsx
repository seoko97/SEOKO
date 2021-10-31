import React from "react";
import styled from "@emotion/styled";

import PageContent from "@molecules/PageContent";
import ParallaxForm from "@molecules/ParallaxForm";

const StyledDiv = styled.div`
  width: 100%;
  height: 300px;
`;

const PortFolio = () => {
  return (
    <>
      <ParallaxForm imgSrc="/portfolio.jpg">
        <h2>Portfolio</h2>
        <p>제작한 게시물입니다.</p>
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

export default PortFolio;
