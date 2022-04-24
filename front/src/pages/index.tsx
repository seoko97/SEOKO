import { GetServerSideProps } from "next";
import { posts as dummyPost } from "@src/dummy/posts";
import { dummyCategory } from "@src/dummy/categories";
import { intializeClinet } from "@lib/apllo";
import { IGetUserInfo } from "@src/types/users";
import { GET_USER_INFO } from "@queries/users";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await dummyPost;
  const categories = await dummyCategory;
  const apolloClient = intializeClinet({ ctx });

  await apolloClient.query<IGetUserInfo>({ query: GET_USER_INFO }).catch((e) => e);

  return {
    props: {
      posts,
      categories,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
