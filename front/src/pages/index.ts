import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo";
import { addApolloState } from "@lib/addApolloState";
import { GET_POSTS } from "@queries/post/getPosts.queries";
import { IGetPosts, IGetPostsVariables } from "@queries-types/posts";
import { checkParams } from "@lib/checkParamsType";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });
  const {
    query: { category },
  } = ctx;

  await apolloClient.query<IGetPosts, IGetPostsVariables>({
    query: GET_POSTS,
    variables: {
      input: {
        category: checkParams(category),
        text: "",
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
