import { GetServerSideProps } from "next";
import { addApolloState } from "@lib/addApolloState";
import { intializeClient } from "@lib/apllo";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";

export { default } from "@pages/Project";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const apolloClient = intializeClient({ ctx });

  const { data, errors } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: { _id: id } },
    errorPolicy: "all",
  });

  if (!data || errors?.[0])
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    };

  return addApolloState(apolloClient, {
    props: {
      _id: id,
    },
  });
};
