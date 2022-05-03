import { GetServerSideProps } from "next";
import { intializeClinet } from "@lib/apllo";
import { GET_USER_INFO } from "@queries/users";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";

export { default } from "@pages/WritePost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = intializeClinet({ ctx });

  const { data } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
    errorPolicy: "all",
  });

  if (!data)
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return addApolloState(apolloClient, {
    props: {},
  });
};
