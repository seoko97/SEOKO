import React, { ForwardedRef, forwardRef, memo } from "react";
import styled from "@emotion/styled";
import SmallPost from "@molecules/PostItem/Small";
import { ISearchPostItem } from "@queries-types/posts";

interface IProps {
  posts: ISearchPostItem[];
}

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

const SearchPost = forwardRef(({ posts }: IProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Container ref={ref}>
      {posts.map((post) => (
        <SmallPost key={post._id} post={post} />
      ))}
    </Container>
  );
});

export default memo(SearchPost);
