import { SignUpUser } from "@src/types/users";
import axios from "../.";

export const onSignup = async (data: SignUpUser) => {
  const result = await axios.post("users/signup", data).then((res) => res.data);

  if (result.pass) return result.username;
};
