import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo/apollo";
import { addApolloState } from "@lib/apollo/addApolloState";
import { GET_POSTS } from "@queries/post/getPosts.queries";
import { IGetPosts, IGetPostsVariables } from "@queries-types/posts";
import { checkParams } from "@lib/checkParamsType";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  const {
    query: { category },
  } = ctx;

  const variables: IGetPostsVariables = { input: { text: "" } };

  if (category) variables.input.category = checkParams(category);

  await apolloClient.query<IGetPosts, IGetPostsVariables>({
    query: GET_POSTS,
    variables,
    context: { headers: ctx.req.headers },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
