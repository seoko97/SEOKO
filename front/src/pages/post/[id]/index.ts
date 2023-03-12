import { addApolloState } from "@lib/addApolloState";
import { initializeClient } from "@lib/apollo";
import { checkTemporaryByUser } from "@lib/checkTemporaryByUser";
import { IGetPost } from "@queries-types/posts";
import { GET_POST } from "@queries/post/getPost.queries";
import { GetServerSideProps } from "next";

export { default } from "@pages/Post";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  const apolloClient = initializeClient({ ctx });

  const result = await apolloClient.query<IGetPost>({
    query: GET_POST,
    variables: { input: { _id: query.id } },
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

  const isPermission = await checkTemporaryByUser(apolloClient, post.isTemporary);

  if (isPermission) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {
      post,
      siblingPost,
    },
  });
};
