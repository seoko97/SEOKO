import React, { useCallback, useRef } from "react";
import Head from "next/head";

import { useQuery } from "@apollo/client";

import { IGetPosts } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post";

import RowFrame from "@frames/RowFrame";
import TagDetail from "@molecules/TagDetail";
import PostList from "@organisms/PostList";

interface IProps {
  tagName: string;
}

const Tag = ({ tagName }: IProps) => {
  const postsRef = useRef(null);

  const { data: postsResult, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: {
      input: {
        tag: tagName,
      },
    },
  });

  const fetchMorePosts = useCallback(() => {
    if (!postsResult) return;

    const {
      getPosts: { posts },
    } = postsResult;

    if (posts.length % 10 !== 0) return;

    fetchMore({
      variables: {
        input: {
          lastId: posts[posts.length - 1]._id,
          tag: tagName,
        },
      },
    });
  }, [postsResult, tagName]);

  const posts = postsResult?.getPosts.posts ?? [];

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
