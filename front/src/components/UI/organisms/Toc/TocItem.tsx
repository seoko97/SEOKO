import React, { useCallback } from "react";
import styled from "@emotion/styled";

import { IToc } from "@store/toc";
import { getClassNameByToc } from "@lib/getClassNameByToc";

interface IProps {
  heading: IToc;
  className: string;
}

const TocItem = ({ heading, className }: IProps) => {
  const onClickToc = useCallback((id: string) => {
    const targetToc = document.getElementById(id);

    if (!targetToc) return;

    document.documentElement.scroll({
      top: window.pageYOffset + targetToc.getBoundingClientRect().top - 80,
      behavior: "smooth",
      left: 0,
    });
  }, []);

  return (
    <Container
      level={heading.level}
      onClick={() => onClickToc(getClassNameByToc(heading.line, heading.level))}
      className={className}
    >
      {heading.text}
    </Container>
  );
};

const Container = styled.div<{ level: number }>`
  width: 100%;
  padding-left: ${({ level }) => (level - 1) * 11}px;
  transition: all 0.2s ease 0s;
  color: rgb(173, 181, 189);
  font-size: 0.9em;

  &:hover {
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  &.active {
    transform: translate(-3px, 0px);
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  cursor: pointer;
`;

export default React.memo(TocItem);
