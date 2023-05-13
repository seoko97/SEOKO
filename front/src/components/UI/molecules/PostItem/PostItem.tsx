import React, { memo } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { IPost } from "@queries-types/posts";
import PostImg from "./PostImg";
import PostContent from "./PostContent";

interface Props {
  post: IPost;
  idx: number;
}

const PostItem = ({ post, idx }: Props) => {
  return (
    <Link href={`/post/${post.numId}`}>
      <Container>
        <PostImg src={post.coverImg} idx={idx} />
        <PostContent
          content={post.content}
          tags={post.tags}
          title={post.title}
          createdAt={post.createdAt}
        />
      </Container>
    </Link>
  );
};

const Container = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.9rem;
  gap: 1.9rem;

  transition: box-shadow 0.3s;

  &:hover {
    & > .post-image {
      transform: translateY(-4px);
      box-shadow: ${({ theme }) => theme.BOX_SHADOW.EFFECT};
    }

    & h1 {
      color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: column;
    gap: 0;
  }
`;

export default memo(PostItem, (prev, next) => prev.post._id === next.post._id);
