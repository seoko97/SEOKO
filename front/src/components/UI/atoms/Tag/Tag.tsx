import React, { memo, MouseEvent } from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  border: 1px solid ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  font-weight: 400;
  border-radius: 10px;
  transition: background-color 0.3s;

  cursor: pointer;
  font-size: 12px;
  line-height: 16px;

  &:hover {
    background: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.SECONDARY_COLOR};
  }
`;

const Tag = ({ onClick, children }: Props) => {
  return <StyledTag onClick={onClick}>{children}</StyledTag>;
};

export default memo(Tag);
