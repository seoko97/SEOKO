import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import useInput from "@hooks/useInput";

import { ADD_POST } from "@queries/post/addPost.queries";
import { IAddPost, IEditPost, IPost } from "@queries-types/posts";

import RowFrame from "@frames/RowFrame";
import TuiEditor from "@organisms/TuiEditor";

import { useRouter } from "next/router";
import { EDIT_POST } from "@queries/post/editPost.queries";
import WritePostHeader from "./WritePostHeader";
import WritePostFooter from "./WritePosFooter";

interface IProps {
  post: IPost;
}

const Container = styled(RowFrame)`
  padding: 30px 0;
`;

const WritePost = ({ post }: IProps) => {
  const router = useRouter();
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [coverImg, setCoverImg] = useState<string>(post?.coverImg || "");
  const [content, setContent] = useState<string>(post?.content || "");
  const [tags, setTags] = useState<string[]>(post?.tags.map((tag) => tag.name) || []);

  const [title, onChangeTitle] = useInput(post?.title || "");
  const [category, onChangeCategory, setCategory] = useInput(post?.category.name || "");
  const [tagName, onChangeTagName, setTagName] = useInput("");
  const [deleteTags, setDeleteTags] = useState<string[]>([]);
  const [addTags, setAddTags] = useState<string[]>([]);

  const [addPostMutation] = useMutation<IAddPost>(ADD_POST, {
    onCompleted({ addPost }) {
      if (addPost.ok) router.push("/");
    },
  });

  const [editPostMutation] = useMutation<IEditPost>(EDIT_POST, {
    onCompleted({ editPost }) {
      if (editPost.ok) router.push("/");
    },
  });
  const addPost = useCallback(async () => {
    const comfirmPost = confirm("저장하시겠습니까?");

    if (!comfirmPost) return;

    if (title.length && content.length && category.length && coverImg) {
      if (post) {
        await editPostMutation({
          variables: {
            input: {
              _id: post._id,
              title,
              content,
              coverImg,
              category,
              addTags,
              deleteTags,
            },
          },
        });
      } else {
        await addPostMutation({
          variables: {
            input: {
              title,
              content,
              coverImg,
              category,
              tags,
            },
          },
        });
      }
    } else alert("필드를 모두 채워주세요");
  }, [title, content, coverImg, category, tags]);

  const addTag = useCallback(
    (e) => {
      if (!e.nativeEvent.isComposing) {
        if (e.key === "Enter") {
          const newTag = tagName.trim();
          if (!tags.includes(tagName) && newTag.length) {
            const existencedTag = post?.tags.find((tag) => tag.name === newTag);

            if (!existencedTag) setAddTags([...addTags, newTag]);

            if (deleteTags.includes(newTag))
              setDeleteTags(deleteTags.filter((tag) => tag !== newTag));

            setTags([...tags, newTag]);
            setTagName("");
          }
        } else if (e.key === "Backspace" && tags.length && !tagName.length) {
          const newTags = [...tags];

          const $tag = newTags.pop();

          const deletedTag = post?.tags.find((tag) => tag.name === $tag);

          if ($tag && deletedTag) setDeleteTags([...deleteTags, $tag]);

          setTags(newTags);
        }
      }
    },
    [tags, tagName, deleteTags, addTags],
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
    if (e.target.files) setCoverImg("/main.jpg");
  }, []);

  return (
    <Container>
      <WritePostHeader
        title={title}
        tagName={tagName}
        category={category}
        tags={tags}
        coverImg={coverImg}
        photoInputRef={photoInputRef}
        addTag={addTag}
        deleteTag={deleteTag}
        onChangeTagName={onChangeTagName}
        onChangeTitle={onChangeTitle}
        onChangeCategory={onChangeCategory}
        setCategory={setCategory}
        coverImageHandler={coverImageHandler}
        onChangeImage={onChangeImage}
        clearCoverImage={clearCoverImage}
      />
      <TuiEditor initialValue={content} onChange={setContent} />
      <WritePostFooter addPost={addPost} />
    </Container>
  );
};

export default WritePost;
