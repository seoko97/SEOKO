import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import useInput from "@hooks/useInput";

import { ADD_POST } from "@queries/post/addPost.queries";
import { IAddPost, IPost } from "@queries-types/posts";

import RowFrame from "@frames/RowFrame";
import TuiEditor from "@organisms/TuiEditor";

import { useRouter } from "next/router";
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

  const [addPostMutation] = useMutation<IAddPost>(ADD_POST, {
    onCompleted({ addPost }) {
      if (addPost.ok) router.push("/");
    },
  });

  const addPost = useCallback(async () => {
    if (title.length && content.length && category.length && coverImg) {
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
    } else alert("필드를 모두 채워주세요");
  }, [title, content, coverImg, category, tags]);

  const addTag = useCallback(
    (e) => {
      if (!e.nativeEvent.isComposing) {
        if (e.key === "Enter") {
          const newTag = tagName.trim().toLowerCase();
          if (!tags.includes(tagName) && newTag.length) {
            setTags([...tags, newTag]);
            setTagName("");
          }
        } else if (e.key === "Backspace" && tags.length) {
          const newTags = [...tags];
          newTags.pop();
          setTags(newTags);
        }
      }
    },
    [tags, tagName],
  );

  const deleteTag = useCallback(
    (e) => {
      const newTags = [...tags];
      const idx = tags.indexOf(e.target.innerText);
      newTags.splice(idx, 1);

      setTags(newTags);
    },
    [tags],
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
    if (e.target.files) {
      setCoverImg(
        "https://velog.velcdn.com/post-images/godori/496c0830-3dc1-11e9-bc03-611ba17bddf2/banner-maker.png",
      );
    }
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
      <TuiEditor onChange={setContent} />
      <WritePostFooter addPost={addPost} />
    </Container>
  );
};

export default WritePost;
