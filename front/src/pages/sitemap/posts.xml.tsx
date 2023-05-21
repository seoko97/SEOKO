import React from "react";
import { GetServerSideProps } from "next";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { initializeClient } from "@lib/apollo/apollo";
import { IGetPosts, IGetPostsVariables } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post";
import { HOST } from "@config/constance";

export default function Sitemap() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  const variables: IGetPostsVariables = { input: { text: "", limit: 9999 } };

  const { data } = await apolloClient.query<IGetPosts, IGetPostsVariables>({
    query: GET_POSTS,
    variables,
    context: { headers: ctx.req.headers },
  });

  const { posts } = data.getPosts;

  const newsSitemaps = posts.map(({ numId, createdAt }) => ({
    loc: `${HOST}/post/${numId}`,
    lastmod: createdAt,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemapLegacy(ctx, fields);
};
