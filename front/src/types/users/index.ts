export interface ISignIn {
  signin: {
    ok: boolean;
    error?: any;
    username: string;
  };
}

export interface ISignOut {
  signout: {
    ok: boolean;
    error?: any;
  };
}

export interface IRefresh {
  refresh: {
    ok: boolean;
    error?: any;
  };
}

export interface IGetUserInfo {
  getUserInfo: {
    ok: boolean;
    error?: any;
    username: string;
  };
}
