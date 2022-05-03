import styled from "@emotion/styled";
import React from "react";
import Tag from "@atoms/Tag";
import { ITag } from "@queries-types/tags";

interface Props {
  tags: ITag[];
}

const StyledTagList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 5px 8px;
`;

const TagList = ({ tags }: Props) => {
  return (
    <>
      <StyledTagList>
        {tags.map((tag) => (
          <Tag key={tag._id} tagName={tag.name} />
        ))}
      </StyledTagList>
    </>
  );
};

export default TagList;
