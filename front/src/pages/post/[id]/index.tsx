import { addApolloState } from "@lib/addApolloState";
import { intializeClinet } from "@lib/apllo";
import { IGetPost } from "@queries-types/posts";
import { GET_POST } from "@queries/post/getPost.queries";
import { GetServerSideProps } from "next";

export { default } from "@pages/Post";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  const apolloClient = intializeClinet({ ctx });

  const result = await apolloClient.query<IGetPost>({
    query: GET_POST,
    variables: { input: { id: query.id } },
    errorPolicy: "all",
  });

  if (!result.data && result.errors?.[0]) {
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    };
  }

  const { post, siblingPost } = result.data.getPost;

  return addApolloState(apolloClient, {
    props: {
      post,
      siblingPost,
    },
  });
};
