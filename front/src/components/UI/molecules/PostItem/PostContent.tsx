import React from "react";
import styled from "@emotion/styled";
import TagList from "@molecules/TagList";
import { ITag } from "@queries-types/tags";
import { ICategory } from "@queries-types/categories";
import { dateTimeParser } from "@lib/dateTimeParser";
import Link from "next/link";

const StyledPostConetent = styled.div`
  width: calc(100% - 250px);
  padding: 10px 0;
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  word-break: break-all;

  h1 {
    transition: color 0.3s;
    font-weight: bold;
    font-size: 20px;
  }

  .date {
    font-size: 1px;
    color: #949494;
    font-weight: 300;
  }
  .category {
    font-size: 12px;
    font-weight: 300;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    padding: 15px 0;
  }
`;

interface Props {
  title: string;
  content: string;
  tags: ITag[];
  category: ICategory;
  createdAt: string;
}

const PostContent = ({ title, content, tags, category, createdAt }: Props) => {
  return (
    <StyledPostConetent>
      <Link href={`/category/${category.name}`}>
        <span className="category">{category.name}</span>
      </Link>
      <h1>{title}</h1>
      <p>{content.length <= 100 ? content : `${content.substring(0, 100)}...`}</p>
      <TagList tags={tags} />
      <span className="date">{dateTimeParser(createdAt)}</span>
    </StyledPostConetent>
  );
};

export default PostContent;
