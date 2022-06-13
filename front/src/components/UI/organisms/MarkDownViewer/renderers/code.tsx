import React from "react";
import styled from "@emotion/styled";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

import InlineCode from "./inlineCode";

const SyntaxWrapper = styled(SyntaxHighlighter)`
  width: 100%;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR} !important;

  font-size: 0.9em;

  & code {
    color: ${({ theme }) => theme.MARK_DOWN.CODE_COLOR} !important;
    text-shadow: none !important;
  }

  & .token {
    background: none !important;
  }
`;

const code: CodeComponent = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxWrapper language={match[1]} PreTag="div" {...props}>
      {String(children).replace(/\n$/, "")}
    </SyntaxWrapper>
  ) : (
    <InlineCode node={node} className={className && className} {...props}>
      {children}
    </InlineCode>
  );
};

export default code;
