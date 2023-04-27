import { addApolloState } from "@lib/apollo/addApolloState";
import { initializeClient } from "@lib/apollo/apollo";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";
import { withErrorHandling } from "@lib/withErrorHandling";
import { IGetPosts, IGetPostsVariables } from "@queries-types/posts";
import { IGetProjects } from "@queries-types/project";
import { IGetUserInfo } from "@queries-types/users";
import { GET_POSTS } from "@queries/post";
import { GET_PROJECTS } from "@queries/project";

export { default } from "@pages/Temporary";

export const getServerSideProps = withErrorHandling(async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  const {
    data: {
      getPosts: { posts },
    },
  } = await apolloClient.query<IGetPosts, IGetPostsVariables>({
    query: GET_POSTS,
    variables: { input: { isTemporary: true } },
  });

  const {
    data: {
      getProjects: { projects },
    },
  } = await apolloClient.query<IGetProjects>({
    query: GET_PROJECTS,
    variables: { input: { isTemporary: true } },
  });

  return addApolloState(apolloClient, {
    props: {
      posts,
      projects,
    },
  });
});
