import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POST } from "@queries/post/getPost.queries";
import { IGetPost } from "@queries-types/posts";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";

import Markdown from "@organisms/MarkDownViewer";
import Toc from "@organisms/Toc";
import PostHeader from "@organisms/PostHeader/PostHeader";

interface Props {
  _id: string;
}

const Container = styled(RowFrame)`
  display: flex;
  gap: 30px;
  & > :first-of-type {
    width: calc(100% - 200px);
  }
  & > :last-of-type {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    & > :first-of-type {
      width: 100%;
    }
  }
`;

const Post = ({ _id }: Props) => {
  const { data } = useQuery<IGetPost>(GET_POST, { variables: { input: { id: _id } } });

  if (!data) return <></>;

  const { category, content, coverImg, createdAt, tags, title } = data.getPost.post;

  return (
    <Container>
      <div>
        <PostHeader
          category={category}
          coverImg={coverImg}
          createdAt={createdAt}
          tags={tags}
          title={title}
        />
        <Markdown content={content} />
      </div>
      <div>
        <Toc content={content} />
      </div>
    </Container>
  );
};

export default Post;
