import { GetServerSideProps } from "next";
import { intializeClient } from "@lib/apllo";
import { GET_USER_INFO } from "@queries/users";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";

export { default } from "@pages/WritePost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const apolloClient = intializeClient({ ctx });

  const { data } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
    errorPolicy: "all",
  });

  const { data: projectData } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: { id: query.id } },
    errorPolicy: "all",
  });

  if (!data || !projectData)
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
