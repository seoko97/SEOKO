import { initializeClient } from "@lib/apollo/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/apollo/addApolloState";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";
import { withErrorHandling } from "@lib/withErrorHandling";

export { default } from "@pages/WriteProject";

export const getServerSideProps = withErrorHandling(async (ctx) => {
  const { id } = ctx.query;
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  const { data: projectData } = await apolloClient.query<IGetProject>({
    query: GET_PROJECT,
    variables: { input: Number(id) },
  });

  if (!projectData)
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {
      numId: Number(id),
    },
  });
});
