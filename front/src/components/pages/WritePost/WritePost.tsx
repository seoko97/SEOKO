import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";

import { IGetPost } from "@queries-types/posts";

import WriteFooter from "@molecules/WriteFooter";
import TuiEditor from "@organisms/TuiEditor";

import { GET_POST } from "@queries/post";
import { useWriteTag } from "@hooks/write/post/useWriteTag";
import { useAddImage } from "@hooks/apollo/image/useAddImage";
import { useWritePost } from "@hooks/write/post/useWritePost";
import { usePostMutation } from "@hooks/apollo/post/usePostMutation";
import WritePostHeader from "./WritePostHeader";

interface IProps {
  _id?: string;
}

const WritePost = ({ _id }: IProps) => {
  const { data } = useQuery<IGetPost>(GET_POST, {
    variables: { input: { _id } },
    skip: !_id,
  });

  const post = data?.getPost.post;

  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [mutation] = usePostMutation(post);

  const [postDataRef, onChangeValue, onChangeContent] = useWritePost(post);
  const [tags, deletedTags, addedTags, tagHandler, onClickTag] = useWriteTag(post);
  const [coverImg, onChangeImage, clearCoverImage] = useAddImage({
    defaultImg: post?.coverImg,
    type: "post",
  });

  const { title, content, category } = postDataRef.current;

  const addPost = useCallback(
    async (e) => {
      const confirmPost = confirm("저장하시겠습니까?");

      if (!confirmPost) return;

      const { dataset } = e.target;
      const isTemporary = Boolean(dataset.isTemporary);

      const input = {
        ...postDataRef.current,
        coverImg,
        isTemporary,
        addTags: post ? addedTags : undefined,
        deleteTags: post ? deletedTags : undefined,
        tags: !post ? tags : undefined,
      };

      mutation(input);
    },
    [postDataRef.current, tags, addedTags, coverImg, deletedTags],
  );

  const coverImageHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (photoInputRef?.current) photoInputRef.current.click();
    },
    [photoInputRef],
  );

  return (
    <Container>
      <WritePostHeader
        title={title}
        tags={tags}
        category={category}
        coverImg={coverImg}
        photoInputRef={photoInputRef}
        tagHandler={tagHandler}
        onClickTag={onClickTag}
        onChangeValue={onChangeValue}
        onChangeImage={onChangeImage}
        clearCoverImage={clearCoverImage}
        coverImageHandler={coverImageHandler}
      />
      <TuiEditor initialValue={content} onChange={onChangeContent} />
      <WriteFooter save={addPost} />
    </Container>
  );
};

export const Container = styled.div`
  width: ${({ theme }) => theme.BP.HDPC};
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  padding: 30px 0;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    width: 100%;
    padding: 0 16px;
  }
`;

export default WritePost;
