import styled from "@emotion/styled";
import React from "react";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.MARK_DOWN.BACK_COLOR};
  border-radius: 4px;
  padding: 2px 4.8px;
  color: ${({ theme }) => theme.MARK_DOWN.CODE_COLOR};
  font-weight: 600;
  font-size: 14.4px;
  overflow-wrap: anywhere;
`;

const inlineCode: CodeComponent = ({ children, ...props }) => {
  return <InlineCode {...props}>{children}</InlineCode>;
};

export default inlineCode;
