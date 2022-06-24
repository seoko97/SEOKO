import React, { ForwardedRef, forwardRef, memo, useRef } from "react";
import styled from "@emotion/styled";
import SmallPost from "@molecules/PostItem/Small";
import { ISearchPostItem } from "@queries-types/posts";
import useFetchScroll from "@hooks/useFetchScroll";

interface IProps {
  posts: ISearchPostItem[];
  func: () => void;
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

const SearchPost = ({ posts, func }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useFetchScroll(ref, func);

  return (
    <Container ref={ref}>
      {posts.map((post) => (
        <SmallPost key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default SearchPost;
