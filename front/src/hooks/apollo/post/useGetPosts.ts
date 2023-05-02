import { useQuery } from "@apollo/client";
import { IGetPostInput, IGetPosts, IGetPostsVariables, IPost } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post";
import { useCallback, useEffect, useState } from "react";

type TUseGetPosts = (input: IGetPostInput) => [IPost[], () => void];

const useGetPosts: TUseGetPosts = (input: IGetPostInput) => {
  const { data, fetchMore } = useQuery<IGetPosts, IGetPostsVariables>(GET_POSTS, {
    variables: {
      input,
    },
  });

  const [posts, setPosts] = useState<IPost[]>(data?.getPosts.posts ?? []);

  const fetchMorePosts = useCallback(() => {
    if (posts.length % 10 !== 0) return;

    const newInput = {
      lastId: posts[posts.length - 1]._id,
      ...input,
    };

    fetchMore({ variables: { input: newInput } });
  }, [input, posts]);

  useEffect(() => {
    const fetchedPosts = data?.getPosts.posts;

    if (fetchedPosts) setPosts(fetchedPosts);
  }, [data]);

  return [posts, fetchMorePosts];
};

export { useGetPosts };
