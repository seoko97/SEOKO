import { CoreResponse } from "./core";

export interface ISignIn {
  signin: {
    username: string;
  } & CoreResponse;
}

export interface ISignOut {
  signout: CoreResponse;
}

export interface IRefresh {
  refresh: CoreResponse;
}

export interface IGetUserInfo {
  getUserInfo: {
    username: string;
  } & CoreResponse;
}
