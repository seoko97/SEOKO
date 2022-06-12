import { useRef, useEffect, useCallback } from "react";

type IProps = (targetEl: React.RefObject<HTMLDivElement>, fetchCallback: () => void) => void;

const useFetchScroll: IProps = (targetEl, fetchCallback) => {
  const observerRef = useRef<IntersectionObserver>();

  const getObserber = useCallback(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && targetEl.current?.lastElementChild) {
          fetchCallback();
          observerRef.current?.unobserve(targetEl.current.lastElementChild);
        }
      },
      { rootMargin: "0px", threshold: 0.3 },
    );
  }, [fetchCallback]);

  useEffect(() => {
    console.log("실행");
    if (!targetEl.current?.lastElementChild) return;

    getObserber();
    observerRef.current?.observe(targetEl.current.lastElementChild);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [targetEl.current, getObserber]);
};

export default useFetchScroll;
