import styled from "@emotion/styled";
import React from "react";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

const BlockQuote = styled.blockquote`
  border-left: 4px solid #495057;
  padding: 18px 24px;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};

  & > p {
    margin: 0;
  }
`;

const blockquote: CodeComponent = ({ children }) => {
  return <BlockQuote>{children}</BlockQuote>;
};

export default blockquote;
