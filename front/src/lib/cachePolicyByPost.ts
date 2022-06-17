export const cachePolicyByPost = {
  keyArgs: ["lastId"],
  merge(existing: any, incoming: any) {
    if (!existing) return incoming;

    const newPosts = [...existing.posts, ...incoming.posts];
    return {
      ...incoming,
      posts: newPosts,
    };
  },
};
