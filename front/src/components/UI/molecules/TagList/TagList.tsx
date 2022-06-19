import React, { memo, MouseEvent, useCallback } from "react";
import styled from "@emotion/styled";
import Tag from "@atoms/Tag";
import { ITag } from "@queries-types/tags";
import { useRouter } from "next/router";

interface Props {
  tags: ITag[];
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  flex-wrap: wrap;
  gap: 5px 8px;
  box-sizing: border-box;
  z-index: 2;
`;

const TagList = ({ tags, onClick }: Props) => {
  return (
    <Container>
      {tags.map((tag) => (
        <Tag key={tag._id} onClick={onClick}>
          {tag.name}
        </Tag>
      ))}
    </Container>
  );
};

export default memo(TagList);
