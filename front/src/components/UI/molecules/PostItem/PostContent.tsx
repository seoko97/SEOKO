import React from "react";
import styled from "@emotion/styled";
import TagList from "@molecules/TagList";

const StyledPostConetent = styled.div`
  width: calc(100% - 250px);

  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  & > div {
    padding: 0 20px;
    height: 100%;
    h2 {
      width: 100%;
      font-weight: 600;
      font-size: 22px;
    }
    & > * {
      margin-bottom: 5px;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    width: 100%;
    height: auto;
    & > div {
      padding: 10px 0;
      h2 {
        font-size: 19px;
      }
    }
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
          <h2>{title}</h2>
          <p>asd</p>
          <div>{content}</div>
          <TagList tags={tags} />
        </div>
      </StyledPostConetent>
    </>
  );
};

export default PostContent;
