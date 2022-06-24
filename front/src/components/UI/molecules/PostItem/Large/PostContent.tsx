import React, { useCallback } from "react";
import styled from "@emotion/styled";
import removeMd from "remove-markdown";

import { ITag } from "@queries-types/tags";

import TagList from "@molecules/TagList";
import { dateTimeParser } from "@lib/dateTimeParser";
import { useRouter } from "next/router";

const StyledPostConetent = styled.div`
  width: calc(100% - 250px);
  padding: 10px 0;
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 15px;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  word-break: break-all;

  h1 {
    width: 100%;
    transition: color 0.3s;
    font-weight: bold;
    font-size: 20px;
  }

  .date {
    font-size: 0.8em;
    color: #949494;
    font-weight: 300;
  }

  p {
    font-size: 0.9em;
    opacity: 0.9;
    margin-bottom: 8px;
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
  createdAt: string;
}

const PostContent = ({ title, content, tags, createdAt }: Props) => {
  const router = useRouter();
  const parsedContent = removeMd(content, { listUnicodeChar: "" }).substring(0, 150);
  const onClickTag = useCallback((e) => {
    e.stopPropagation();
    router.push(`/tag/${e.target.innerText}`);
  }, []);

  return (
    <StyledPostConetent>
      <h1>{title}</h1>
      <p>{parsedContent.length >= 150 ? `${parsedContent}...` : parsedContent}</p>
      <TagList onClick={onClickTag} tags={tags} />
      <span className="date">{dateTimeParser(createdAt)}</span>
    </StyledPostConetent>
  );
};

export default PostContent;
