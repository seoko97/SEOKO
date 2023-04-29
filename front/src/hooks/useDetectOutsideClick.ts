import { useRouter } from "next/router";
import { MutableRefObject, useState, useEffect } from "react";

type RetrunObj = [boolean, () => void];

const useDetectOutsideClick = (
  el: MutableRefObject<Node | null>,
  initialState: boolean,
): RetrunObj => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(initialState);

  const onChangeActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (!isActive) return;

    const onClick = (e: MouseEvent) => {
      if (el.current !== null && !el.current.contains(e.target as Node)) setIsActive(false);
    };

    if (isActive) document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  useEffect(() => {
    setIsActive(false);
  }, [router.asPath]);

  return [isActive, onChangeActive];
};

export default useDetectOutsideClick;
