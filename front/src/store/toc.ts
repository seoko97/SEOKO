import { makeVar } from "@apollo/client";

export interface IToc {
  level: number;
  text: string;
  line: number;
}

export const tocVar = makeVar<IToc[]>([]);

export const setTocVar = (info: IToc) => {
  const prev = tocVar();
  tocVar([...prev, info]);
};

export const resetToc = () => tocVar([]);
