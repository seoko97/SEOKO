import React, { useMemo } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";

import { IPost, ISiblingPost } from "@queries-types/posts";

import Markdown from "@organisms/MarkDownViewer";
import PostHeader from "@organisms/PostHeader";
import PostFooter from "@organisms/PostFooter";
import Toc from "@organisms/Toc";
import removeMd from "remove-markdown";
import auth from "@components/hoc/auth";

interface Props {
  post: IPost;
  siblingPost: ISiblingPost;
}

const Container = styled(RowFrame)`
  width: 768px;
`;

const PostContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100% 250px;
  gap: 4em;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    display: block;
    & > div:first-of-type {
      width: 100%;
    }
  }
`;

const Post = auth(({ post, siblingPost }: Props) => {
  const { content, title, coverImg } = post;

  const postDescription = useMemo(
    () => removeMd(content, { useImgAltText: false }).slice(0, 200),
    [content],
  );

  return (
    <>
      <Head>
        <title>{title} :: SEOKO</title>
        <meta name="description" content={`${postDescription}...`} />
        <meta property="og:title" content={`${title} :: SEOKO`} />
        <meta property="og:description" content={`${postDescription}...`} />
        <meta property="og:image" content={coverImg} />
      </Head>
      <Container>
        <PostHeader post={post} />
        <PostContent>
          <Markdown content={content} />
          <Toc content={content} />
        </PostContent>
        <PostFooter siblingPost={siblingPost} />
      </Container>
    </>
  );
});

export default Post;
