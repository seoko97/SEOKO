import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { IGetUserInfo } from "@queries-types/users";
import { GET_USER_INFO_OPTION } from "./initializeSigninCheck";

export const checkTemporaryByUser = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  isTemporary: boolean,
) => {
  const { data } = await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  if (!data?.getUserInfo.username && isTemporary) return true;

  return false;
};
