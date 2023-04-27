import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/apollo/addApolloState";
import { initializeClient } from "@lib/apollo/apollo";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";
import { checkTemporaryByUser } from "@lib/checkTemporaryByUser";

export { default } from "@pages/Project/[id]";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const apolloClient = initializeClient({ ctx });

  const { data, errors } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: id },
  });

  if (!data || errors?.[0]) {
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    };
  }

  const permissions = await checkTemporaryByUser(apolloClient, data.getProject.project.isTemporary);

  if (permissions) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {
      _id: id,
    },
  });
};
