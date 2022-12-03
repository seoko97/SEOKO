import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo";
import { GET_USER_INFO } from "@queries/users";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";

export { default } from "@pages/WriteProject";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const apolloClient = initializeClient({ ctx });

  const { data: userData } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
  });

  const { data: projectData } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: query.id },
  });

  if (!userData || !projectData)
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {
      project: projectData.getProject.project,
    },
  });
};
