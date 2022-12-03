import React, { forwardRef } from "react";
import styled from "@emotion/styled";

import PostItem from "@molecules/PostItem";
import { IPost } from "@queries-types/posts";
import useFetchScroll from "@hooks/useFetchScroll";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  posts: IPost[];
  func: () => void;
}

const PostList = forwardRef<HTMLDivElement, IProps>(({ posts, func }, ref) => {
  useFetchScroll(ref, func);

  return (
    <Container ref={ref}>
      {posts.map((post, idx) => (
        <PostItem key={post._id + post.title + idx} post={post} />
      ))}
    </Container>
  );
});

export default React.memo(PostList);
