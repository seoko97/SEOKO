import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

interface Props {
  tagName: string;
}

export const StyledTag = styled.div`
  padding: 5px 8px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  font-size: 14px;
  font-weight: 400;
  border-radius: 50px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.SECONDARY_COLOR};
  }
`;

const Tag = ({ tagName }: Props) => {
  return (
    <>
      <Link href={`/tag/${tagName}`}>
        <StyledTag>{tagName}</StyledTag>
      </Link>
    </>
  );
};

export default Tag;
