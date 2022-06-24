import React, { memo, useCallback, useRef } from "react";
import RowFrame from "@frames/RowFrame";
import { ITag } from "@queries-types/tags";
import { OperationVariables, useQuery } from "@apollo/client";
import { GET_POSTS_BY_TAG } from "@queries/post/getPostsByTag.queries";
import { IGetPostsByTag } from "@queries-types/posts";
import PostList from "@organisms/PostList";
import TagListForm from "@organisms/TagListForm";

interface IProps {
  tagName: string | undefined;
  tags: ITag[];
}

const Tag = ({ tags, tagName }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { data, fetchMore } = useQuery<IGetPostsByTag>(GET_POSTS_BY_TAG, {
    variables: tagName
      ? {
          input: {
            tagName,
          },
        }
      : {},
  });

  const getMorePosts = useCallback(() => {
    const variables: OperationVariables = {
      input: {
        lastId: data?.getPostsByTag.posts[data?.getPostsByTag.posts.length - 1]._id,
      },
    };

    if (tagName) variables.input.tagName = tagName;

    fetchMore({ variables });
  }, [tagName, data]);

  return (
    <RowFrame>
      <TagListForm tags={tags} tagName={tagName} />
      {data?.getPostsByTag?.posts[0] && (
        <PostList func={getMorePosts} ref={ref} posts={data?.getPostsByTag.posts} />
      )}
    </RowFrame>
  );
};

export default memo(Tag, (prev, next) => prev.tagName === next.tagName);
