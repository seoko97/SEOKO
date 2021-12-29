import React from "react";
import styled from "@emotion/styled";
import TagList from "@molecules/TagList";

const StyledPostConetent = styled.div`
  width: calc(100% - 250px);
  padding: 10px 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  word-break: break-all;

  h1 {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 5px;
  }
  p {
    &:first-of-type {
      font-size: 11px;
      margin-bottom: 5px;
      color: #ccc;
      font-weight: 300;
    }
    &:last-of-type {
      flex-grow: 2;
      margin-bottom: 5px;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    width: 100%;
  }
`;

interface Props {
  title: string;
  content: string;
  tags: string[];
}

const PostContent = ({ title, content, tags }: Props) => {
  return (
    <>
      <StyledPostConetent>
        <h1>{title}</h1>
        <p>날짜</p>
        <p>{content}</p>
        <TagList tags={tags} />
      </StyledPostConetent>
    </>
  );
};

export default PostContent;
