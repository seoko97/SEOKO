import React, { useCallback } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import PostNavigation from "@molecules/PostNavigation";
import TagList from "@molecules/TagList";
import { IDeletePost, IPost } from "@queries-types/posts";
import { DELETE_POST } from "@queries/post/deletePost.queries";
import { userInfoVar } from "@store/userInfo";
import Detail from "./Detail";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  overflow-wrap: break-word;

  gap: 30px;
  margin: 32px 0 60px 0;

  & > h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 1.2;
  }

  & > * {
    text-align: center;
    justify-content: center;
  }

  & > .image-container {
    width: 90%;
    position: relative;
    padding-bottom: 50%;
    align-items: center;

    & img {
      border-radius: 10px;
      position: absolute;
      justify-content: center;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    & > .image-container {
      width: 100%;
    }
  }
  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    gap: 18px;

    & > h1 {
      line-height: 1.6;
      font-size: 1.6em;
    }
  }
`;

interface IProps {
  post: IPost;
}

const PostHeader = ({ post }: IProps) => {
  const { _id, title, coverImg, createdAt, tags } = post;
  const { username } = useReactiveVar(userInfoVar);
  const router = useRouter();

  const [deletePostMutation] = useMutation<IDeletePost>(DELETE_POST, {
    onCompleted({ deletePost }) {
      if (deletePost.ok) router.push("/");
    },
  });

  const deletePost = useCallback(() => {
    if (!username) return;
    const comf = confirm("삭제하시겠습니까?");
    if (comf)
      deletePostMutation({
        variables: {
          input: {
            id: _id,
          },
        },
      });
  }, [username, _id]);

  const editPost = useCallback(() => {
    router.push(`/write/post/${_id}`);
  }, []);

  const onClickTag = useCallback((e) => {
    router.push(`/tag/${e.target.innerText}`);
  }, []);

  return (
    <Container>
      <div className="image-container">
        <Image priority={true} layout="fill" src={coverImg} objectFit="cover" />
      </div>
      <h1>{title}</h1>
      {tags[0] && <TagList onClick={onClickTag} tags={tags} />}
      <Detail createdAt={createdAt} />
      {username && <PostNavigation onDelete={deletePost} onEdit={editPost} />}
    </Container>
  );
};

export default PostHeader;
