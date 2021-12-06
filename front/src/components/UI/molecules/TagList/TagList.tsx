import styled from "@emotion/styled";
import React from "react";
import Tag from "../../atoms/Tag";

interface Props {
  tags: string[];
}

const StyledTagList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  font-weight: 500;

  & > div {
    margin-right: 5px;
  }
`;

const TagList = ({ tags }: Props) => {
  return (
    <>
      <StyledTagList>
        {tags.map((tag, i) => (
          <Tag key={i + tag} tagName={tag} />
        ))}
      </StyledTagList>
    </>
  );
};

export default TagList;
