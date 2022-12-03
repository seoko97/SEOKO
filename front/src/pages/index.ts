import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo";
import { addApolloState } from "@lib/addApolloState";
import { GET_POSTS } from "@queries/post/getPosts.queries";
import { GET_TAGS } from "@queries/tag";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });
  const {
    query: { tag },
  } = ctx;

  await apolloClient.query({
    query: GET_POSTS,
    variables: { input: { tag } },
  });

  await apolloClient.query({
    query: GET_TAGS,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
