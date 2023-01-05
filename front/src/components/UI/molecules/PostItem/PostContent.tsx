import React, { useCallback } from "react";
import { useRouter } from "next/router";
import removeMd from "remove-markdown";

import styled from "@emotion/styled";

import { ITag } from "@queries-types/tags";

import TagList from "@molecules/TagList";
import { dateTimeParser } from "@lib/dateTimeParser";

const StyledPostContent = styled.div`
  flex: 1;
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  word-break: break-all;

  h1 {
    width: 100%;
    transition: color 0.3s;
    font-weight: 500;
    font-size: 1.1em;
  }

  .date {
    color: #949494;
    font-weight: 400;
    font-size: 0.9rem;
  }

  p {
    font-weight: 300;
    margin-bottom: 8px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    min-height: 0;

    padding: 0.75rem 0.3rem;
    gap: 0.75rem;
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
  const parsedContent = removeMd(content, { listUnicodeChar: "" }).substring(0, 100);
  const onClickTag = useCallback((e) => {
    e.stopPropagation();
    router.push(`/tag/${e.target.innerText}`);
  }, []);

  return (
    <StyledPostContent>
      <h1>{title}</h1>
      <p>{parsedContent.length >= 150 ? `${parsedContent}...` : parsedContent}</p>
      {tags.length !== 0 && <TagList onClick={onClickTag} tags={tags} />}
      <span className="date">{dateTimeParser(createdAt)}</span>
    </StyledPostContent>
  );
};

export default PostContent;
