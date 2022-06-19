import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface IProps {
  repo: string;
}

const Container = styled.section`
  width: 100%;

  & > div {
    max-width: 100%;
    width: 100%;
    margin: 15px 0;
  }
`;

const Untterances = ({ repo }: IProps) => {
  const ref = useRef<HTMLScriptElement>(null);
  const router = useRouter();

  useEffect(() => {
    const utterances = document.createElement("script");
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": "pathname",
      label: "comment",
      theme: "github-light",
      crossorigin: "anonymous",
      async: "true",
      id: "untterances",
    };
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    ref.current?.append(utterances);

    return () => {
      if (ref.current && ref.current.children[0]) ref.current.children[0].remove();
    };
  }, [router.asPath]);

  return <Container ref={ref} />;
};

export default Untterances;
