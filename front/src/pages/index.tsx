import { GetServerSideProps } from "next";
import { intializeClinet } from "@lib/apllo";
import { addApolloState } from "@lib/addApolloState";
import { IGetPosts } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post/getPosts.queries";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = intializeClinet({ ctx });

  await apolloClient.query<IGetPosts>({ query: GET_POSTS });

  return addApolloState(apolloClient, {
    props: {},
  });
};
