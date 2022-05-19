import React, { useCallback, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import styled from "@emotion/styled";
import { useIntersectionObserver } from "@lib/useIntersectionObserver";
import { tocVar } from "@store/toc";

interface Props {
  content: string;
}

const Container = styled.div`
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 50px;
  position: sticky;
  top: 85px;

  overflow-wrap: break-word;

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    display: none;
  }
`;

const TocItem = styled.div<{ level: number }>`
  cursor: pointer;
  padding-left: ${({ level }) => (level - 1) * 11}px;
  transition: all 0.2s ease 0s;
  color: rgb(173, 181, 189);

  :hover {
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  &.active {
    transform: translate(-8px, 0px);
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }
`;

const Toc = ({ content }: Props) => {
  const headings = useReactiveVar(tocVar);
  const [activeId, setActiveId] = useState("");
  useIntersectionObserver(setActiveId, content);

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
    <div>
      <Container>
        {headings.length > 0 &&
          headings.map((heading, i) => (
            <TocItem
              key={heading.text + i}
              level={heading.level}
              onClick={() => onClickToc(heading.text + heading.level)}
              className={activeId === heading.text + heading.level ? "active" : ""}
            >
              {heading.text}
            </TocItem>
          ))}
      </Container>
    </div>
  );
};

export default Toc;
