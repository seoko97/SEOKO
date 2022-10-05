import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { ISiblingItem } from "@queries-types/posts";

interface IProps {
  post: ISiblingItem;
  type: string;
}

const Container = styled.div<{ type: string }>`
  width: 30%;
  flex: 1;

  & a {
    border: 1px solid #ccc;
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: ${({ type }) => (type === "next" ? "flex-end" : "flex-start")};
    gap: 12px;
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
    padding: 16px;
    border-radius: 8px;
    transition: background-color 0.3s;

    & span {
      font-size: 13px;
      font-weight: bold;
      color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    }

    & h3 {
      color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
      display: block;
      width: 100%;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: ${({ type }) => (type === "next" ? "right" : "left")};
      transition: color 0.3s;
    }

    :hover {
      & h3 {
        color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

const SiblingItem = ({ post, type }: IProps) => {
  return (
    <Container type={type}>
      {post && (
        <Link href={`/post/${post._id}`}>
          <a>
            <span>{type === "next" ? "다음" : "이전"} 포스트</span>
            <h3>{post.title}</h3>
          </a>
        </Link>
      )}
    </Container>
  );
};

export default SiblingItem;
