import React, { useState } from "react";
import styled from "@emotion/styled";
import { useReactiveVar } from "@apollo/client";

import { IToc, tocVar } from "@store/toc";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { getClassNameByToc } from "@lib/getClassNameByToc";
import { useToc } from "@hooks/useToc";
import TocItem from "./TocItem";

interface Props {
  content: string;
}

const Toc = ({ content }: Props) => {
  const headings = useReactiveVar(tocVar);
  const [activeId, setActiveId] = useState("");
  const [onClickToc] = useToc(headings);

  useIntersectionObserver(setActiveId, content);

  const tocItemProps = (heading: IToc) => ({
    onClickToc,
    heading,
    className: activeId === getClassNameByToc(heading.line, heading.level) ? "active" : "",
  });

  if (headings.length === 0) return null;

  return (
    <Container>
      {headings.map((heading, i) => (
        <TocItem key={heading.text + i} {...tocItemProps(heading)} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 120px;
  overflow-wrap: anywhere;
  font-size: 0.9em;

  @media (max-width: calc(${({ theme }) => theme.BP.PC} + 250px + 4em)) {
    display: none;
  }
`;

export default Toc;
