import React, { memo } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { IPost } from "@queries-types/posts";
import PostImg from "./PostImg";
import PostContent from "./PostContent";

interface Props {
  post: IPost;
}

const PostItem = ({ post }: Props) => {
  return (
    <Link href={`/post/${post._id}`}>
      <Container>
        <PostImg titleImage={post.coverImg} />
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
  position: relative;
  cursor: pointer;
  gap: 30px;

  transition: box-shadow 0.3s;

  &:hover {
    & > .post-image {
      transform: translateY(-4px);
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
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

export default memo(PostItem, (prev, next) => prev.post._id === next.post._id);
