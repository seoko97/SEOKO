import styled from "@emotion/styled";
import React from "react";

const StyledPostConetent = styled.div`
  width: calc(100% - 250px);
  height: 200px;

  display: flex;
  flex-direction: column;

  & > div {
    padding: 20px;
    height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    width: 100%;
    height: auto;
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
        <div>
          <h1>{title}</h1>
          <div>{content}</div>
          <div>
            {tags.map((el, i) => (
              <div key={title + el + i}>{el}</div>
            ))}
          </div>
        </div>
      </StyledPostConetent>
    </>
  );
};

export default PostContent;
