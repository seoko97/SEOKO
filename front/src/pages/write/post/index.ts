import { GetServerSideProps } from "next";
import { initializeClient } from "@lib/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/addApolloState";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";

export { default } from "@pages/WritePost";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  const { data } = await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

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
