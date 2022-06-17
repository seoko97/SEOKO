import React, { memo } from "react";
import styled from "@emotion/styled";
import Tag from "@atoms/Tag";
import { ITag } from "@queries-types/tags";

interface Props {
  tags: ITag[];
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

const TagList = ({ tags }: Props) => {
  return (
    <Container>
      {tags.map((tag) => (
        <Tag key={tag._id} tagName={tag.name} />
      ))}
    </Container>
  );
};

export default memo(TagList);
