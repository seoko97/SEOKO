import React, { useCallback, useRef } from "react";

import RowFrame from "@frames/RowFrame";
import Intro from "@molecules/Intro";

import PostList from "@organisms/PostList";
import { useQuery } from "@apollo/client";
import { IGetPosts } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post/getPosts.queries";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    errorPolicy: "all",
  });

  const fetchMorePosts = useCallback(() => {
    fetchMore({
      variables: {
        input: {
          lastId: data?.getPosts.posts[data?.getPosts.posts.length - 1]._id,
        },
      },
    });
  }, [ref, data]);

  return (
    <RowFrame>
      <Intro />
      {data?.getPosts?.posts[0] && (
        <PostList ref={ref} posts={data?.getPosts.posts} func={fetchMorePosts} />
      )}
    </RowFrame>
  );
};

export default Home;
