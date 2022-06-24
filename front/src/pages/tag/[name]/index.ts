import { GetServerSideProps } from "next";

import { addApolloState } from "@lib/addApolloState";
import { intializeClient } from "@lib/apllo";

import { IGetTags } from "@queries-types/tags";
import { IGetPostsByTag } from "@queries-types/posts";
import { GET_TAGS } from "@queries/tag/getTags.queries";
import { GET_POSTS_BY_TAG } from "@queries/post/getPostsByTag.queries";

export { default } from "@pages/Tag";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query;
  const apolloClient = intializeClient({ ctx });

  const { data: tagsData } = await apolloClient.query<IGetTags>({
    query: GET_TAGS,
  });

  await apolloClient.query<IGetPostsByTag>({
    query: GET_POSTS_BY_TAG,
    variables: { input: { tagName: name as string } },
    errorPolicy: "all",
  });

  return addApolloState(apolloClient, {
    props: {
      tagName: name,
      tags: tagsData.getTags.tags.slice().sort((a, b) => b.posts.length - a.posts.length) ?? [],
    },
  });
};
