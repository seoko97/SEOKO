import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "@src/queries/users";
import { setUserInfo } from "@src/store/userInfo";
import { IGetUserInfo } from "@src/types/users";

const SigninCheck = () => {
  const { data } = useQuery<IGetUserInfo>(GET_USER_INFO);

  useEffect(() => {
    if (data?.getUserInfo.ok) setUserInfo(data.getUserInfo.username);
  }, [data?.getUserInfo]);
  return null;
};

export default SigninCheck;
