import React from "react";
import styled from "@emotion/styled";

import { IToc } from "@store/toc";

interface IProps {
  heading: IToc;
  className: string;
  onClickToc: React.MouseEventHandler;
}

const TocItem = ({ heading, className, onClickToc }: IProps) => {
  return (
    <Container
      data-line={heading.line}
      data-level={heading.level}
      level={heading.level}
      className={className}
    >
      <a
        href={`#${heading.text}`}
        onClick={onClickToc}
        data-line={heading.line}
        data-level={heading.level}
      >
        {heading.text}
      </a>
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
