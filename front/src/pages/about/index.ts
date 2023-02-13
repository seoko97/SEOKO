import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";
import { GET_ABOUT } from "@queries/about";
import { GetServerSideProps } from "next";

export { default } from "@pages/About";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query({
    query: GET_ABOUT,
    variables: {
      input: { isTemporary: false },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
