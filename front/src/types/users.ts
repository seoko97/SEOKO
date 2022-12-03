import { CoreResponse } from "./core";

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

interface IGetUserInfo {
  getUserInfo: {
    username: string;
  } & CoreResponse;
}

export type { ISignIn, ISignOut, IGetUserInfo, IRefresh };
