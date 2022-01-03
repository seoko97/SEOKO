import { MutableSnapshot } from "recoil";
import { userState } from "./users/atoms";
import { postState } from "./posts/atoms";

interface IObj {
  [key: string]: any;
}
export const allAtoms: IObj = {
  user: userState,
  posts: postState,
};

export const initializeRecoilState =
  (initialRecoilState: typeof allAtoms) =>
  ({ set }: MutableSnapshot) => {
    console.log(initialRecoilState);
    Object.keys(initialRecoilState).forEach((key) => {
      const value = initialRecoilState[key];
      const atom = allAtoms[key];

      console.log(atom, value);
      set(atom, value);
    });
  };
