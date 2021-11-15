import { atom } from "recoil";

interface Props {
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
