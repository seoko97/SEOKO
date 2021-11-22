import React from "react";
import styled from "@emotion/styled";

import ParallaxForm from "@molecules/ParallaxForm";
import PageContent from "@molecules/PageContent";
import PostList from "@src/components/UI/organisms/PostList";
import RowFrame from "@src/components/UI/frames/RowFrame";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  & #asdasd {
    flex: 1;
    height: 200px;
    position: sticky;
    top: 100px;
    background-color: #ccc;
  }

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    flex-direction: column;
    & #asdasd {
      position: relative;
      top: 0;
      width: 100%;
      flex-grow: 0;
      order: 1;
      margin-bottom: 30px;
    }
  }
`;

const Home = () => {
  return (
    <>
      <ParallaxForm imgSrc="/main.jpg">
        <h2>Main</h2>
        <p>SEOKO&apos;s blog</p>
      </ParallaxForm>
      <PageContent>
        <RowFrame>
          <StyledDiv>
            <PostList />
            <div id="asdasd">asdasd</div>
          </StyledDiv>
        </RowFrame>
      </PageContent>
    </>
  );
};

export default Home;
