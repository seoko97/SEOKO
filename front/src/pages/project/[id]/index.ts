import { addApolloState } from "@lib/apollo/addApolloState";
import { initializeClient } from "@lib/apollo/apollo";
import { IGetProject } from "@queries-types/project";
import { GET_PROJECT } from "@queries/project/getProject.queries";
import { checkTemporaryByUser } from "@lib/checkTemporaryByUser";
import { withErrorHandling } from "@lib/withErrorHandling";

export { default } from "@pages/Project/[id]";

export const getServerSideProps = withErrorHandling(async (ctx) => {
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

  const { project } = data.getProject;

  if (project.isTemporary) {
    const isPermission = await checkTemporaryByUser(apolloClient, project.isTemporary);

    if (isPermission) throw new Error("권한이 없습니다.");
  }

  return addApolloState(apolloClient, {
    props: {
      _id: id,
    },
  });
});
