import { SignInUser, SignUpUser } from "@src/types/users";
import { AxiosError } from "axios";
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
  const result = await axios
    .get("users/info")
    .then((res) => {
      return res.data;
    })
    .catch((e: AxiosError) => console.log(e.response));

  return result;
};
