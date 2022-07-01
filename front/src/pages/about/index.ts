import { addApolloState } from "@lib/addApolloState";
import { intializeClient } from "@lib/apllo";
import { GET_ABOUT } from "@queries/about";
import { GetServerSideProps } from "next";

export { default } from "@pages/About";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = intializeClient({ ctx });

  await apolloClient.query({
    query: GET_ABOUT,
    errorPolicy: "all",
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
