import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_USER_INFO } from "@queries/users";
import { IGetUserInfo } from "@queries-types/users";

export const checkTemporaryByUser = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  isTemporary: boolean,
) => {
  const { data } = await apolloClient.query<IGetUserInfo>({ query: GET_USER_INFO });

  if (!data?.getUserInfo.username && isTemporary) return true;

  return false;
};
