import { GetServerSideProps } from "next";

import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";

import { GET_POSTS } from "@queries/post";
import { GET_TAG } from "@queries/tag";

export { default } from "@pages/Tag/[name]";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  const {
    query: { name },
  } = ctx;

  await apolloClient.query({
    query: GET_POSTS,
    variables: { input: { tag: name } },
  });

  await apolloClient.query({
    query: GET_TAG,
    variables: { input: name },
  });

  return addApolloState(apolloClient, {
    props: {
      tagName: name,
    },
  });
};
