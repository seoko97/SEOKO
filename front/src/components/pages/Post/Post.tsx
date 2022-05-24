import React, { useEffect } from "react";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";

import { IPost, ISiblingPost } from "@queries-types/posts";

import Markdown from "@organisms/MarkDownViewer";
import PostHeader from "@organisms/PostHeader";
import PostFooter from "@organisms/PostFooter";
import Toc from "@organisms/Toc";
import { resetToc } from "@store/toc";

interface Props {
  post: IPost;
  siblingPost: ISiblingPost;
}

const PostContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > div:first-of-type {
    width: 75%;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    & > div:first-of-type {
      width: 100%;
    }
  }
`;

const Post = ({ post, siblingPost }: Props) => {
  const { content } = post;

  useEffect(() => {
    return () => {
      resetToc();
    };
  }, [content]);

  return (
    <RowFrame>
      <PostHeader post={post} />
      <PostContent>
        <Markdown content={content} />
        <Toc content={content} />
      </PostContent>
      <PostFooter siblingPost={siblingPost} />
    </RowFrame>
  );
};

export default Post;
