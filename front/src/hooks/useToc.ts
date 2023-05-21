import { getClassNameByToc } from "@lib/getClassNameByToc";
import { IToc } from "@store/toc";
import { useCallback, useEffect, useState } from "react";

type TUseTocFc = (toc: IToc[]) => [React.MouseEventHandler<HTMLDivElement>];

const useToc: TUseTocFc = (tocList: IToc[]) => {
  const [scrollY, setScrollY] = useState(0);

  const onClickToc: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const target = e.currentTarget;

    if (!target) return;

    const { line, level } = target.dataset;

    if (!line || !level) return;

    const headingId = getClassNameByToc(Number(line), Number(level));

    const targetToc = document.getElementById(headingId);

    if (!targetToc) return;

    setScrollY(window.scrollY + targetToc.getBoundingClientRect().top - 80);
  }, []);

  useEffect(() => {
    const decodedHash = decodeURI(window.location.hash.slice(1));

    if (!decodedHash) return;

    const toc = tocList.find((heading) => heading.text === decodedHash);

    if (!toc) return;

    const headingId = getClassNameByToc(toc.line, toc.level);

    const targetToc = document.getElementById(headingId);

    if (!targetToc) return;

    setScrollY(window.scrollY + targetToc.getBoundingClientRect().top - 80);
  }, [tocList]);

  useEffect(() => {
    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
      left: 0,
    });
  }, [scrollY]);

  return [onClickToc];
};

export { useToc };
