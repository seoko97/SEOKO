import { SignInUser, SignUpUser } from "@src/types/users";
import axios from "../.";

export const onSignup = async (data: SignUpUser) => {
  const result = await axios.post("users/signup", data).then((res) => res.data);

  return result;
};

export const onSignout = async () => {
  const result = await axios.post("auth/signout").then((res) => res.data);

  return result;
};

export const onSignin = async (data: SignInUser) => {
  const result = await axios.post("auth/signin", data).then((res) => res.data);

  return result;
};

export const initatialSigninCheck = async () => {
  const result = await axios.get("users/info").then((res) => res.data);

  return result;
};
