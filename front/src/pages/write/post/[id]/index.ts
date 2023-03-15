import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";
import { IGetPost } from "@queries-types/posts";
import { GET_POST } from "@queries/post/getPost.queries";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";

export { default } from "@pages/WritePost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const apolloClient = initializeClient({ ctx });

  const { data } = await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  const { data: postData } = await apolloClient.query<IGetPost>({
    query: GET_POST,
    variables: { input: { _id: query.id } },
  });

  if (!data || !postData)
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {
      post: postData.getPost.post,
    },
  });
};
