import React, { useEffect } from "react";
import styled from "@emotion/styled";

import PostItem from "@molecules/PostItem";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@queries/post/getPosts.queries";
import { IGetPosts } from "@queries-types/posts";

const StyledPostList = styled.div`
  width: 100%;
  margin-right: 30px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    margin-right: 0;
  }
`;

const PostList = () => {
  const { data } = useQuery<IGetPosts>(GET_POSTS);

  return (
    <>
      <StyledPostList>
        {data?.getPosts.ok &&
          data?.getPosts.posts.map((post) => <PostItem key={post._id + post.title} post={post} />)}
      </StyledPostList>
    </>
  );
};

export default PostList;
