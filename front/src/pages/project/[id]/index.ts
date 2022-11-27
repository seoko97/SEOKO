import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";

export { default } from "@pages/Project/[id]";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const apolloClient = initializeClient({ ctx });

  const { data, errors } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: id },
  });

  if (!data || errors?.[0])
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };

  return addApolloState(apolloClient, {
    props: {
      projectId: id,
    },
  });
};
