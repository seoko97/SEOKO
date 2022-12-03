import React, { useCallback } from "react";
import Head from "next/head";
import styled from "@emotion/styled";

import { useQuery } from "@apollo/client";

import { IGetTags } from "@queries-types/tags";
import { GET_TAGS } from "@queries/tag";

import AtomTag from "@atoms/Tag";
import RowFrame from "@frames/RowFrame";
import { useRouter } from "next/router";

const Tag = () => {
  const router = useRouter();
  const { data } = useQuery<IGetTags>(GET_TAGS);

  if (!data) return <></>;

  const {
    getTags: { tags },
  } = data;

  const onClickTag: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const { currentTarget } = e;

    if (currentTarget.dataset.name) {
      router.push(`tag/${currentTarget.dataset.name}`);
    }
  }, []);

  return (
    <>
      <Head>
        <title>태그목록 :: SEOKO</title>
        <meta name="description" content={`${tags.length}개의 태그`} />
        <meta name="og:title" content={`태그목록 :: SEOKO`} />
        <meta name="og:description" content={`${tags.length}개의 태그`} />
      </Head>
      <Container>
        <p>There ara {tags.length} Tags.</p>
        <div>
          {tags.map((tag) => (
            <AtomTag key={tag._id} onClick={onClickTag} data-name={tag.name}>
              {tag.name} ({tag.posts.length})
            </AtomTag>
          ))}
        </div>
      </Container>
    </>
  );
};

const Container = styled(RowFrame)`
  width: ${({ theme }) => theme.BP.TABLET};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1.2em 0;

  & > p {
    font-size: 1.2em;
    font-weight: 500;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  & > div {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

export default Tag;
