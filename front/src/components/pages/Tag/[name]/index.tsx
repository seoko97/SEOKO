import React, { useRef } from "react";
import Head from "next/head";

import RowFrame from "@frames/RowFrame";
import TagDetail from "@molecules/TagDetail";
import PostList from "@organisms/PostList";
import { useGetPosts } from "@hooks/apollo/post/useGetPosts";

interface IProps {
  tagName: string;
}

const Tag = ({ tagName }: IProps) => {
  const postsRef = useRef(null);

  const [posts, fetchMorePosts] = useGetPosts({
    tag: tagName,
  });

  return (
    <>
      <Head>
        <title>태그 {tagName}에 대한 검색 결과 :: SEOKO</title>
        <meta name="description" content={`${posts.length}개의 포스트`} />
        <meta property="og:title" content={`태그 ${tagName}에 대한 검색 결과 :: SEOKO`} />
        <meta property="og:description" content={`${posts.length}개의 포스트`} />
      </Head>
      <RowFrame>
        <TagDetail tagName={tagName} />
        <PostList ref={postsRef} posts={posts} func={fetchMorePosts} />
      </RowFrame>
    </>
  );
};

export default Tag;
