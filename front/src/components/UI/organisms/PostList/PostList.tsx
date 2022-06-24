import React, { forwardRef } from "react";
import styled from "@emotion/styled";

import PostItem from "@molecules/PostItem/Large";
import { IPost } from "@queries-types/posts";
import useFetchScroll from "@hooks/useFetchScroll";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-right: 30px;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    margin-right: 0;
  }
`;

interface IProps {
  posts: IPost[];
  func: () => void;
}

export const PostList = forwardRef<HTMLDivElement, IProps>(({ posts, func }, ref) => {
  useFetchScroll(ref, func);

  return (
    <Container ref={ref}>
      {posts.map((post, idx) => (
        <PostItem key={post._id + post.title + idx} post={post} />
      ))}
    </Container>
  );
});

export default PostList;
