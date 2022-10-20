import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";
import { SEARCH_POSTS } from "@queries/post";
import { ISearchPosts } from "@queries-types/posts";

export { default } from "@pages/Search";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<ISearchPosts>({
    query: SEARCH_POSTS,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
