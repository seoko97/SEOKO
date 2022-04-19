import { FC, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactChild;
  state: boolean;
}

const ModalPortal: FC<Props> = ({ children, state }) => {
  const modalRef = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    modalRef.current = document.getElementById("modal");
    bodyRef.current = document.body;

    if (state) bodyRef.current.style.overflow = "hidden";
    return () => {
      (bodyRef.current as HTMLElement).style.overflow = "auto";
    };
  }, [state]);

  return state && mounted ? createPortal(children, modalRef.current as HTMLElement) : null;
};

export default ModalPortal;
