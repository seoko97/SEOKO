import { makeVar } from "@apollo/client";

interface IUserInfo {
  username: string | null;
}

export const userInfoVar = makeVar<IUserInfo>({
  username: null,
});

export const setUserInfo = (username: string | null) => userInfoVar({ username });
