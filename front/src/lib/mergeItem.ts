import { IBasePosts } from "@queries-types/posts";

export const mergeItem = <T extends IBasePosts>(existing: T, incoming: T) => {
  if (!existing) return incoming;

  const newPosts = [...existing.posts, ...incoming.posts];

  return {
    ...incoming,
    posts: newPosts,
  };
};
