import { onSignup } from "@src/apis/users";
import { selector } from "recoil";
import { userState } from "./atoms";

export const createUser = selector({
  key: "createUser",
  get: ({ get }) => get(userState),
  set: ({ set }, value) => {
    const data = {
      username: "asd",
      password: "1007",
      userId: "wltjrgh",
    };
    const result = onSignup(data);
  },
});
