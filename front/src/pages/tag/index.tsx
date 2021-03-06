import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/addApolloState";
import { intializeClient } from "@lib/apllo";
import { IGetPostsByTag } from "@queries-types/posts";
import { IGetTags } from "@queries-types/tags";
import { GET_POSTS_BY_TAG } from "@queries/post/getPostsByTag.queries";
import { GET_TAGS } from "@queries/tag/getTags.queries";

export { default } from "@pages/Tag";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = intializeClient({ ctx });

  const { data: tagsData } = await apolloClient.query<IGetTags>({
    query: GET_TAGS,
  });

  await apolloClient.query<IGetPostsByTag>({
    query: GET_POSTS_BY_TAG,
    errorPolicy: "all",
  });

  return addApolloState(apolloClient, {
    props: {
      tagName: null,
      tags: tagsData.getTags.tags.slice().sort((a, b) => b.posts.length - a.posts.length) ?? [],
    },
  });
};
