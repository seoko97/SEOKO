import { atom } from "recoil";

export interface Props {
  id: number;
  category: string;
  title: string;
  content: string;
  titleImage: string;
  tags: string[];
}

export const postState = atom<Props[] | null>({
  key: "postState",
  default: null,
});
