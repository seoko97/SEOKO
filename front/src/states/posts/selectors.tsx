import { DefaultValue, selector, selectorFamily } from "recoil";
import { SignUpUser } from "@src/types/users";
import { postState } from "./atoms";

interface Param extends SignUpUser {
  [key: string]: any;
}

export const setUserState = selector({
  key: "setUserState",
  get: async ({ get }) => get(postState),
  set: ({ set }, userData) => {},
});
