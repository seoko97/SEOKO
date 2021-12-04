import React from "react";
import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";

import { postState } from "@states/posts/atoms";
import PostItem from "@molecules/PostItem";

const StyledPostList = styled.div`
  flex: 3;
  margin-right: 30px;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    margin-right: 0;
  }
`;

const PostList = () => {
  const posts = useRecoilValue(postState);

  return (
    <>
      <StyledPostList>
        {posts && posts.map((el) => <PostItem key={el.id + el.title} post={el} />)}
      </StyledPostList>
    </>
  );
};

export default PostList;
