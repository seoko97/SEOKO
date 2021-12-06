import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Props as PostProps } from "@states/posts/atoms";
import PostImg from "./PostImg";
import PostContent from "./PostContent";

interface Props {
  post: PostProps;
}

const StyedPostItem = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 60px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    width: 100%;
    flex-direction: column;
  }
`;

const PostItem = ({ post }: Props) => {
  return (
    <>
      <Link href={`/post/${post.id}`}>
        <StyedPostItem>
          <PostImg titleImage={post.titleImage} />
          <PostContent content={post.content} tags={post.tags} title={post.title} />
        </StyedPostItem>
      </Link>
    </>
  );
};

export default PostItem;
