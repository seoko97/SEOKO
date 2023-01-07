import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface IProps {
  repo: string;
}

const Container = styled.section`
  width: 100%;

  & .utterances {
    max-width: 100%;
  }
`;

const Utterances = ({ repo }: IProps) => {
  const router = useRouter();
  const ref = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    const utterances = document.createElement("script");
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": "pathname",
      label: "comment",
      crossorigin: "anonymous",
      async: "true",
      id: "utterances",
    };
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    ref.current?.append(utterances);

    return () => {
      if (ref.current && ref.current.children[0]) {
        ref.current.children[0].remove();
      }
    };
  }, [router.asPath]);

  return <Container ref={ref} />;
};

export default Utterances;
