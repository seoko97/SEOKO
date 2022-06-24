import { GetServerSideProps } from "next";
import { intializeClient } from "@lib/apllo";
import { GET_USER_INFO } from "@queries/users";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";
import { IGetPost } from "@queries-types/posts";
import { GET_POST } from "@queries/post/getPost.queries";

export { default } from "@pages/WritePost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const apolloClient = intializeClient({ ctx });

  const { data } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
    errorPolicy: "all",
  });

  const postRes = await apolloClient.query<IGetPost>({
    query: GET_POST,
    variables: { input: { id: query.id } },
    errorPolicy: "all",
  });

  if (!data || (!postRes.data && postRes.errors?.[0]))
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {
      post: postRes.data.getPost.post,
    },
  });
};
