import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/apollo/addApolloState";
import { initializeClient } from "@lib/apollo/apollo";
import { IGetTags } from "@queries-types/tags";
import { GET_TAGS } from "@queries/tag/getTags.queries";

export { default } from "@pages/Tag";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<IGetTags>({ query: GET_TAGS });

  return addApolloState(apolloClient, {
    props: {},
  });
};
