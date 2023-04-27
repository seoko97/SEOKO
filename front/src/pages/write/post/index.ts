import { initializeClient } from "@lib/apollo/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/apollo/addApolloState";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";
import { withErrorHandling } from "@lib/withErrorHandling";

export { default } from "@pages/WritePost";

export const getServerSideProps = withErrorHandling(async (ctx) => {
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
});
