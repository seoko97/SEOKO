import { initializeClient } from "@lib/apollo/apollo";
import { IGetUserInfo } from "@queries-types/users";
import { addApolloState } from "@lib/apollo/addApolloState";
import { GET_USER_INFO_OPTION } from "@lib/initializeSigninCheck";
import { withErrorHandling } from "@lib/withErrorHandling";

export { default } from "@pages/WriteProject";

export const getServerSideProps = withErrorHandling(async (ctx) => {
  const apolloClient = initializeClient({ ctx });

  await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  return addApolloState(apolloClient, {
    props: {},
  });
});
