import { GetServerSideProps } from "next";
import { intializeClinet } from "@lib/apllo";
import { IGetUserInfo } from "@queries-types/users";
import { GET_USER_INFO } from "@queries/users";
import { addApolloState } from "@lib/addApolloState";
import { IGetPosts } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post/getPosts.queries";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = intializeClinet({ ctx });

  await apolloClient.query<IGetUserInfo>({ query: GET_USER_INFO, errorPolicy: "all" });
  await apolloClient.query<IGetPosts>({ query: GET_POSTS });

  return addApolloState(apolloClient, {
    props: {},
  });
};
