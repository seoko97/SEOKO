import { GetServerSideProps } from "next";

import { addApolloState } from "@lib/addApolloState";
import { intializeClient } from "@lib/apllo";
import { IGetProjects } from "@queries-types/project";
import { GET_PROJECTS } from "@queries/project/getProjects.queries";

export { default } from "@pages/Projects";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = intializeClient({ ctx });

  await apolloClient.query<IGetProjects>({ query: GET_PROJECTS });

  return addApolloState(apolloClient, {
    props: {},
  });
};
