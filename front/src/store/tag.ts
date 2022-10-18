import { makeVar } from "@apollo/client";

export const tagVar = makeVar<string | undefined>("");

export const setTagVar = (tag?: string) => {
  tagVar(tag);
};
