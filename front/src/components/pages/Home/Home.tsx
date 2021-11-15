import React from "react";
import styled from "@emotion/styled";

import ParallaxForm from "@molecules/ParallaxForm";
import PageContent from "@molecules/PageContent";
import PostList from "@src/components/UI/organisms/PostList";

const StyledDiv = styled.div`
  width: 100%;
  height: 300px;
`;

const Home = () => {
  return (
    <>
      <ParallaxForm imgSrc="/main.jpg">
        <h2>Main</h2>
        <p>SEOKO&apos;s blog</p>
      </ParallaxForm>
      <PageContent>
        <PostList />
      </PageContent>
    </>
  );
};

export default Home;
