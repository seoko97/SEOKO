import { useRouter } from "next/router";
import {
  MutableRefObject,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type RetrunObj = [boolean, Dispatch<SetStateAction<boolean>>, () => void];

const useDetectOutsideClick = (
  el: MutableRefObject<Node | null>,
  initialState: boolean,
): RetrunObj => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(initialState);

  const onChangeActive = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (el.current !== null && !el.current.contains(e.target as Node)) setIsActive(false);
    };

    if (isActive) window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  useEffect(() => {
    setIsActive(false);
  }, [router.asPath]);

  return [isActive, setIsActive, onChangeActive];
};

export default useDetectOutsideClick;
