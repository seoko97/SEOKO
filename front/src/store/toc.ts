import { makeVar } from "@apollo/client";

interface IToc {
  level: number;
  text: string;
}

export const tocVar = makeVar<IToc[]>([]);

export const setTocVar = (info: IToc) => {
  const prev = tocVar();
  tocVar([...prev, info]);
};

export const resetToc = () => tocVar([]);
