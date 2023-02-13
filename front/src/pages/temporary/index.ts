import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";
import { IGetPosts } from "@queries-types/posts";
import { IGetProjects } from "@queries-types/project";
import { IGetUserInfo } from "@queries-types/users";
import { GET_POSTS } from "@queries/post";
import { GET_PROJECTS } from "@queries/project";
import { GET_USER_INFO } from "@queries/users";
import { GetServerSideProps } from "next";

export { default } from "@pages/Temporary";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  const { data: userData } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
  });

  if (!userData) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const {
    data: {
      getPosts: { posts },
    },
  } = await apolloClient.query<IGetPosts>({
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
};
