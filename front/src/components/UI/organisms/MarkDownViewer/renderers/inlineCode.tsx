import styled from "@emotion/styled";
import React from "react";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.MARK_DOWN.BACK_COLOR};
  color: ${({ theme }) => theme.MARK_DOWN.CODE_COLOR};

  transition: background-color 0.3s, color 0.3s !important;

  border-radius: 4px;
  padding: 3px 8px;
  font-weight: 600;
  font-size: 14.4px;
  overflow-wrap: anywhere;
`;

const inlineCode: CodeComponent = ({ children, ...props }) => {
  return <InlineCode {...props}>{children}</InlineCode>;
};

export default inlineCode;
