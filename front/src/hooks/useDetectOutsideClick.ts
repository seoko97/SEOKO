import { MutableRefObject, useState, useEffect, Dispatch, SetStateAction } from "react";

type RetrunObj = [boolean, Dispatch<SetStateAction<boolean>>];

const useDetectOutsideClick = (
  el: MutableRefObject<Node | null>,
  initialState: boolean,
): RetrunObj => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (el.current !== null && !el.current.contains(e.target as Node)) setIsActive(!isActive);
    };

    if (isActive) window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
