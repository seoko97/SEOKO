import React, { memo } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { IPost } from "@queries-types/posts";
import PostImg from "./PostImg";
import PostContent from "./PostContent";

const StyedPostItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  gap: 30px;

  &:hover {
    & > div:first-of-type {
      box-shadow: rgb(0 0 0 / 30%) 0px 4px 16px 0px;
    }

    & img {
      transform: scale(1.2);
    }

    & h1 {
      color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: column;
    gap: 0;
    padding: 0;
  }
`;

interface Props {
  post: IPost;
}

const PostItem = ({ post }: Props) => {
  return (
    <Link href={`/post/${post._id}`}>
      <StyedPostItem>
        <PostImg titleImage={post.coverImg} />
        <PostContent
          content={post.content}
          tags={post.tags}
          title={post.title}
          createdAt={post.createdAt}
        />
      </StyedPostItem>
    </Link>
  );
};

export default memo(PostItem, (prev, next) => prev.post._id === next.post._id);
