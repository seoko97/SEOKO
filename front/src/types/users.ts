import { CoreResponse, CoreResult } from "./core";

interface ISignIn {
  signin: {
    username: string;
  } & CoreResponse;
}

interface ISignOut {
  signout: CoreResponse;
}

interface IRefresh {
  refresh: CoreResponse;
}

type IGetUserInfo = CoreResult<
  "getUserInfo",
  {
    username: string;
  }
>;

export type { ISignIn, ISignOut, IGetUserInfo, IRefresh };
