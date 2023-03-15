import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";

export { default } from "@pages/WriteProject";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const apolloClient = initializeClient({ ctx });

  const { data: userData } = await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  const { data: projectData } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: id },
  });

  if (!userData || !projectData)
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {
      _id: id,
    },
  });
};
