import { addApolloState } from "@lib/apollo/addApolloState";
import { initializeClient } from "@lib/apollo/apollo";
import { checkTemporaryByUser } from "@lib/checkTemporaryByUser";
import { withErrorHandling } from "@lib/withErrorHandling";
import { IGetPost } from "@queries-types/posts";
import { GET_POST } from "@queries/post/getPost.queries";

export { default } from "@pages/Post";

export const getServerSideProps = withErrorHandling(async (ctx) => {
  const { id } = ctx.query;

  const apolloClient = initializeClient({ ctx });

  const result = await apolloClient.query<IGetPost>({
    query: GET_POST,
    variables: { input: { _id: id } },
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

  if (post.isTemporary) {
    const isPermission = await checkTemporaryByUser(apolloClient, post.isTemporary);

    if (isPermission) throw new Error("권한이 없습니다.");
  }

  return addApolloState(apolloClient, {
    props: {
      post,
      siblingPost,
      _id: id,
    },
  });
});
