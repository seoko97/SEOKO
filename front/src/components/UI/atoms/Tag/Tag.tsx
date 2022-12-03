import React, { memo } from "react";
import styled from "@emotion/styled";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  height: 28px;
  padding: 0.2em 0.9em;
  font-size: 0.8em;

  cursor: pointer;
  transition: color 0.2s;

  color: #2e4270;
  background-color: #e8ebee;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  }
`;

const Tag = ({ children, ...props }: Props) => {
  return <StyledTag {...props}>{children}</StyledTag>;
};

export default memo(Tag);
