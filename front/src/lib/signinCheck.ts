import { intializeClinet } from "@src/lib/apllo";
import { GET_USER_INFO } from "@src/queries/users";
import { IGetUserInfo } from "@src/types/users";
import { setUserInfo } from "@store/userInfo";

const signinCheck = async () => {
  const aplloClient = intializeClinet();
  const { data } = await aplloClient.query<IGetUserInfo>({
    query: GET_USER_INFO,
    fetchPolicy: "no-cache",
  });

  if (data?.getUserInfo.ok) setUserInfo(data.getUserInfo.username);
};

export default signinCheck;
