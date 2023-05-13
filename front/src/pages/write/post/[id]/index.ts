import { initializeClient } from "@lib/apollo/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/apollo/addApolloState";
import { IGetPost } from "@queries-types/posts";
import { GET_POST } from "@queries/post/getPost.queries";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";
import { withErrorHandling } from "@lib/withErrorHandling";

export { default } from "@pages/WritePost";

export const getServerSideProps = withErrorHandling(async (ctx) => {
  const { id } = ctx.query;
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  const { data: postData } = await apolloClient.query<IGetPost>({
    query: GET_POST,
    variables: { input: { numId: Number(id) } },
  });

  if (!postData)
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {
      numId: Number(id),
    },
  });
});
