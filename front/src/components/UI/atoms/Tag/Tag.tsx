import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

interface Props {
  tagName: string;
}

const StyledTag = styled.div`
  padding: 5px 8px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  font-size: 12px;
  border-radius: 10px;
  margin: 0 5px 5px 0;

  &:hover {
    text-decoration: underline;
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
