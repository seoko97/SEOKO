import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/apollo/addApolloState";
import { initializeClient } from "@lib/apollo/apollo";
import { IGetProjects } from "@queries-types/project";
import { GET_PROJECTS } from "@queries/project/getProjects.queries";

export { default } from "@pages/Project";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<IGetProjects>({
    query: GET_PROJECTS,
    variables: { input: { isTemporary: false } },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
