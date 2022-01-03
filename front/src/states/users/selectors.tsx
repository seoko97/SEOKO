import { DefaultValue, selector } from "recoil";
import { SignUpUser } from "@src/types/users";
import { userState } from "./atoms";

interface Param extends SignUpUser {
  [key: string]: any;
}

export const setUserState = selector<string | null>({
  key: "setUserState",
  get: async ({ get }) => get(userState),
  set: ({ set }, userData) => {
    if (userData instanceof DefaultValue) set(userState, userData);
  },
});
