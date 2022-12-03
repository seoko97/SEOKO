import { GET_USER_INFO } from "@queries/users";
import { setUserInfo } from "@store/userInfo";
import { IGetUserInfo } from "@queries-types/users";
import { initializeClient } from "./apollo";

const initializeSigninCheck = async () => {
  const apolloClient = initializeClient();

  const { data } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
  });

  if (data?.getUserInfo?.ok) setUserInfo(data.getUserInfo.username);
  else setUserInfo(null);
};

export default initializeSigninCheck;
