import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/addApolloState";
import { intializeClient } from "@lib/apllo";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";

export { default } from "@pages/ProjectDetail";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const apolloClient = intializeClient({ ctx });

  await apolloClient.query<IGetProject>({ query: GET_PROJECT, variables: { input: { _id: id } } });

  return addApolloState(apolloClient, {
    props: {
      _id: id,
    },
  });
};
