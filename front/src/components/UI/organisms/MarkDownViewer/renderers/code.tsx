import React from "react";
import styled from "@emotion/styled";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

import InlineCode from "./inlineCode";

const SyntaxWrapper = styled(SyntaxHighlighter)`
  width: 100%;
  background-color: ${({ theme }) => theme.MARK_DOWN.BACK_COLOR} !important;
  transition: background-color 0.3s !important;

  box-shadow: rgb(0 0 0 / 15%) 0px 5px 16px 0px;

  border-radius: 4px;

  & code {
    transition: color 0.3s !important;

    color: ${({ theme }) => theme.MARK_DOWN.CODE_COLOR} !important;
    text-shadow: none !important;
    font-size: 0.9em !important;
  }

  & .token {
    background: none !important;
  }
`;

const code: CodeComponent = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxWrapper language={match[1]} PreTag="div" className={className && className} {...props}>
      {String(children).replace(/\n$/, "")}
    </SyntaxWrapper>
  ) : (
    <InlineCode node={node} className={className && className} {...props}>
      {children}
    </InlineCode>
  );
};

export default code;
