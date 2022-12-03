import { useEffect, useState } from "react";

interface ScrollState {
  clientHeight: number;
  scrollHeight: number;
  windowY: number;
  windowX: number;
}

const useScroll = () => {
  const [scrollInfo, setScrollInfo] = useState<ScrollState>({
    clientHeight: 0,
    scrollHeight: 0,
    windowY: 0,
    windowX: 0,
  });

  const handleScroll = () => {
    const { clientHeight, scrollHeight } = document.documentElement;
    setScrollInfo({ clientHeight, scrollHeight, windowY: window.scrollX, windowX: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollInfo;
};

export default useScroll;
