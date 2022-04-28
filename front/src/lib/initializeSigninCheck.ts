import { GET_USER_INFO } from "@src/queries/users";
import { setUserInfo } from "@src/store/userInfo";
import { IGetUserInfo } from "@src/types/users";
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
