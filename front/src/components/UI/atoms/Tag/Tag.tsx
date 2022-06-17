import React, { memo } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

interface Props {
  tagName: string;
}

export const StyledTag = styled.div`
  padding: 6px 8px;
  color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  border: 1px solid ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  font-weight: 400;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  font-size: 14.4px;
  line-height: 100%;

  &:hover {
    background: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.SECONDARY_COLOR};
  }
`;

const Tag = ({ tagName }: Props) => {
  return (
    <Link href={`/tag/${tagName}`}>
      <StyledTag>{tagName}</StyledTag>
    </Link>
  );
};

export default memo(Tag);
