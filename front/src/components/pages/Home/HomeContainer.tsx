import styled from "@emotion/styled";
import PostList from "@organisms/PostList";
import React from "react";

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const HomeContainer = () => {
  return (
    <StyledDiv>
      <PostList />
    </StyledDiv>
  );
};

export default HomeContainer;
