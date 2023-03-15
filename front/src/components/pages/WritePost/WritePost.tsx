import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_POST } from "@queries/post/addPost.queries";
import {
  BasePostInput,
  IAddPost,
  IAddPostVariables,
  IEditPost,
  IEditPostInput,
  IEditPostVariables,
  IGetPost,
  IPost,
} from "@queries-types/posts";
import { EDIT_POST } from "@queries/post/editPost.queries";

import WriteFooter from "@molecules/WriteFooter";
import TuiEditor from "@organisms/TuiEditor";

import { ADD_IMAGE } from "@queries/image/addImage.queries";
import { IAddImage } from "@queries-types/image";
import { CoreResponse } from "@queries-types/core";
import { GET_POST } from "@queries/post";
import WritePostHeader from "./WritePostHeader";

interface IProps {
  _id?: string;
}

const WritePost = ({ _id }: IProps) => {
  const { data } = useQuery<IGetPost>(GET_POST, {
    variables: { input: { _id: _id ?? "" } },
    skip: !_id,
  });

  const post = data?.getPost.post;

  const router = useRouter();
  const postInputData: BasePostInput = {
    _id: post?._id || undefined,
    title: post?.title || "",
    content: post?.content || "",
    category: post?.category || "dev",
    coverImg: post?.coverImg || "",
  };

  const postDataRef = useRef<BasePostInput>(postInputData);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [tags, setTags] = useState<string[]>(post?.tags.map((tag) => tag.name) || []);
  const [coverImg, setCoverImg] = useState<string>(post?.coverImg || "");

  const [deleteTags, setDeleteTags] = useState<string[]>([]);
  const [addTags, setAddTags] = useState<string[]>([]);

  const [addImageMutation] = useMutation<IAddImage>(ADD_IMAGE, {
    onCompleted({ addImage }) {
      const { image, ok } = addImage;

      if (ok) {
        setCoverImg(image);
        postDataRef.current.coverImg = image;
      }
    },
  });

  const [addPostMutation] = useMutation<IAddPost, IAddPostVariables>(ADD_POST, {
    onCompleted({ addPost }) {
      movePageToHome(addPost);
    },
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "getPosts",
      });
    },
  });

  const [editPostMutation] = useMutation<IEditPost, IEditPostVariables>(EDIT_POST, {
    onCompleted({ editPost }) {
      movePageToHome(editPost);
    },
    update(cache, { data }, { variables }) {
      const prev = cache.readQuery<IGetPost>({
        query: GET_POST,
        variables: { input: { _id: variables?.input._id } },
      });

      if (!data || !prev) return;

      cache.writeQuery<IGetPost>({
        query: GET_POST,
        variables: { input: { _id: variables?.input._id } },
        data: {
          getPost: {
            ...prev?.getPost,
            post: data.editPost.post,
          },
        },
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "getPosts",
      });
    },
  });

  const movePageToHome = <T extends CoreResponse>(data: T) => {
    if (!data.ok) return;

    router.push("/");
  };

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const name = e.target.name as keyof Pick<IEditPostInput, "category">;

      if (postDataRef.current[name] === undefined) return;

      postDataRef.current[name] = e.target.value;
    },
    [postDataRef],
  );

  const onChangeContent = useCallback(
    (value: string) => {
      postDataRef.current.content = value;
    },
    [postDataRef],
  );

  const addPost = useCallback(
    async (e) => {
      const confirmPost = confirm("저장하시겠습니까?");

      if (!confirmPost) return;

      const { dataset } = e.target;
      const isTemporary = Boolean(dataset.isTemporary);

      if (post) {
        await editPostMutation({
          variables: {
            input: {
              ...postDataRef.current,
              addTags,
              deleteTags,
              isTemporary,
            },
          },
        });
      } else {
        await addPostMutation({
          variables: {
            input: {
              ...postDataRef.current,
              isTemporary,
              tags,
            },
          },
        });
      }
    },
    [postDataRef.current, tags, addTags, deleteTags],
  );

  const addTag: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const tagName = e.currentTarget.value;

      if (e.nativeEvent.isComposing) return;

      if (e.key === "Enter") {
        const newTag = tagName.trim();

        if (tags.includes(tagName) || !newTag.length) return;

        const existencesTag = post?.tags.find((tag) => tag.name === newTag);

        if (!existencesTag) {
          setAddTags([...addTags, newTag]);
        }

        if (deleteTags.includes(newTag)) {
          setDeleteTags(deleteTags.filter((tag) => tag !== newTag));
        }

        setTags([...tags, newTag]);
        e.currentTarget.value = "";
      } else if (e.key === "Backspace" && tags.length && !tagName.length) {
        const newTags = [...tags];

        const $tag = newTags.pop();

        const deletedTag = post?.tags.find((tag) => tag.name === $tag);

        if ($tag && deletedTag) setDeleteTags([...deleteTags, $tag]);

        setTags(newTags);
      }
    },
    [tags, deleteTags, addTags, postDataRef.current],
  );

  const deleteTag = useCallback(
    (e) => {
      const $tag = e.target.innerText;
      const newTags = [...tags];
      const idx = tags.indexOf($tag);
      newTags.splice(idx, 1);

      const deletedTag = post?.tags.find((tag) => tag.name === $tag);

      if (deletedTag) setDeleteTags([...deleteTags, $tag]);

      setTags(newTags);
    },
    [tags, deleteTags],
  );

  const clearCoverImage = useCallback(() => {
    setCoverImg("");
  }, []);

  const coverImageHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (photoInputRef?.current) photoInputRef.current.click();
    },
    [photoInputRef],
  );

  const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    addImageMutation({
      variables: {
        input: {
          type: "post",
          image: e.target.files[0],
        },
      },
    });
  }, []);

  const { title, content, category } = postDataRef.current;

  return (
    <Container>
      <WritePostHeader
        title={title}
        tags={tags}
        category={category}
        coverImg={coverImg}
        photoInputRef={photoInputRef}
        addTag={addTag}
        deleteTag={deleteTag}
        onChangeTagName={onChangeValue}
        onChangeTitle={onChangeValue}
        onSelectCategory={onChangeValue}
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
