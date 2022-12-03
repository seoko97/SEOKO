import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import TagList from "@molecules/TagList";
import { ITag } from "@queries-types/tags";

interface IProps {
  tags: ITag[];
  tagName: string | undefined;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  border-radius: 10px;
  padding: 20px;
  margin: 30px 90px 50px 90px;
  gap: 20px;
  transition: color 0.3s;
  border: 2px solid ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};

  & > h3 {
    font-size: 1.35rem;
    font-weight: 500;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    margin: 0 0 50px 0;
    & > h3 {
      font-size: 1.2rem;
    }
  }
`;

const TagListForm = ({ tags, tagName }: IProps) => {
  const router = useRouter();

  const onClickTag = useCallback(
    (e) => {
      const $tag = e.target.tagName === "SPAN" ? e.target.parentNode : e.target;
      const newSelectedTag = tags.find((tag) => tag.name === $tag.innerText.split("\n")[0]);

      if (newSelectedTag) router.push(`/tag/${newSelectedTag.name}`);
    },
    [tags],
  );

  const selectedTag = useMemo(() => tags.find((tag) => tag.name === tagName), [tags, tagName]);

  return (
    <Container>
      <h3>{tagName ? `#${tagName}` : `There are ${tags.length} tags.`}</h3>
      {tagName && <span> {selectedTag?.posts.length}개의 게시글</span>}
      <TagList tags={tags} onClick={onClickTag} />
    </Container>
  );
};

export default TagListForm;
