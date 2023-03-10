import { GET_USER_INFO } from "@queries/users";
import { setUserInfo } from "@store/userInfo";
import { IGetUserInfo } from "@queries-types/users";
import { QueryOptions } from "@apollo/client";
import { initializeClient } from "./apollo";

export const GET_USER_INFO_OPTION: QueryOptions = {
  query: GET_USER_INFO,
  fetchPolicy: "no-cache",
};

const initializeSigninCheck = async () => {
  const apolloClient = initializeClient();

  const { data } = await apolloClient.query<IGetUserInfo>(GET_USER_INFO_OPTION);

  if (data?.getUserInfo?.ok) setUserInfo(data.getUserInfo.username);
  else setUserInfo(null);
};

export default initializeSigninCheck;
