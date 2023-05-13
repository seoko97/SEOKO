import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { ISiblingItem } from "@queries-types/posts";
import ReftIcon from "@icons/ArrowIcon/Reft";
import RightIcon from "@icons/ArrowIcon/Right";

interface IProps {
  post: ISiblingItem;
  type: keyof typeof ARROW;
}

const ARROW = {
  next: <ReftIcon />,
  prev: <RightIcon />,
};

const SiblingItem = ({ post, type }: IProps) => {
  return (
    <Container type={type}>
      {post && (
        <Link href={`/post/${post.numId}`}>
          <a>
            <div>
              {type === "prev" && <ReftIcon />}
              {type.toLocaleUpperCase()}
              {type === "next" && <RightIcon />}
            </div>
            <h3>{post.title}</h3>
          </a>
        </Link>
      )}
    </Container>
  );
};

const Container = styled.div<{ type: string }>`
  flex: 1;

  & a {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: ${({ type }) => (type === "next" ? "flex-end" : "flex-start")};
    gap: 12px;
    border-radius: 8px;
    padding: 1rem;
    background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};

    cursor: pointer;

    &:hover {
      & h3 {
        color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
      }
    }
  }

  & div {
    display: flex;
    align-items: center;
    gap: 1em;
    font-size: 13px;
    font-weight: bold;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  }

  & svg {
    width: 1.2em;
    height: 1.2em;
    fill: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
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

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

export default SiblingItem;
