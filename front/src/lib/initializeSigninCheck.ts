import { GET_USER_INFO } from "@queries/users";
import { setUserInfo } from "@store/userInfo";
import { IGetUserInfo } from "@queries-types/users";
import { intializeClinet } from "./apllo";

const initializeSigninCheck = async () => {
  const apolloClient = intializeClinet();

  const { data } = await apolloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
    errorPolicy: "all",
  });

  if (data?.getUserInfo?.ok) setUserInfo(data.getUserInfo.username);
  else setUserInfo(null);
};

export default initializeSigninCheck;
