import React, { useRef, useCallback } from "react";
import styled from "@emotion/styled";

import PostItem from "@molecules/PostItem/Large";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@queries/post/getPosts.queries";
import { IGetPosts } from "@queries-types/posts";
import useFetchScroll from "@hooks/useFetchScroll";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-right: 30px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    margin-right: 0;
  }
`;

const PostList = () => {
  const viewport = useRef<HTMLDivElement>(null);
  const { data, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    errorPolicy: "all",
  });

  const fetchMorePosts = useCallback(() => {
    fetchMore({
      variables: {
        input: {
          lastId: data?.getPosts.posts[data?.getPosts.posts.length - 1]._id,
        },
      },
    });
  }, [viewport, data]);

  useFetchScroll(viewport, fetchMorePosts);

  return (
    <Container ref={viewport}>
      {data?.getPosts.posts.map((post, idx) => (
        <PostItem key={post._id + post.title + idx} post={post} />
      ))}
    </Container>
  );
};

export default PostList;
