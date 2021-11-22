import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

import { postState } from "@states/posts/atoms";
import { post as postList } from "@src/dummy/posts";
import PostItem from "@molecules/PostItem";

const StyledPostList = styled.div`
  flex: 3;
  margin-right: 30px;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    margin-right: 0;
    order: 2;
  }
`;

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postState);

  useEffect(() => {
    setPosts(postList);
  }, []);

  return (
    <>
      <StyledPostList>
        {posts && posts.map((el) => <PostItem key={el.id + el.title} post={el} />)}
      </StyledPostList>
    </>
  );
};

export default PostList;
