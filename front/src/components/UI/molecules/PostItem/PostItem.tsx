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
  align-items: center;
  justify-content: center;

  margin-bottom: 60px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 1px 10px -4px rgba(196, 196, 196, 0.7);
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
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
