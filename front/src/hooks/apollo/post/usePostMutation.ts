import { gql, useMutation } from "@apollo/client";
import {
  IPost,
  IAddPost,
  IEditPost,
  BasePostInput,
  IAddPostVariables,
  IEditPostVariables,
  IDeletePost,
} from "@queries-types/posts";
import { ADD_POST, DELETE_POST, EDIT_POST } from "@queries/post";
import { useRouter } from "next/router";

const POST_FRAGMENT = gql`
  fragment Post on Post {
    _id
    title
    content
  }
`;

const usePostMutation = (post?: IPost) => {
  const router = useRouter();

  const onCompleted = () => {
    router.push("/");
  };

  const [addPostMutation] = useMutation<IAddPost, IAddPostVariables>(ADD_POST, {
    onCompleted,
    update(cache) {
      cache.evict({ fieldName: "getPosts" });
      cache.gc();
    },
  });

  const [editPostMutation] = useMutation<IEditPost, IEditPostVariables>(EDIT_POST, {
    onCompleted,
    update(cache, { data }) {
      if (!data?.editPost) return;

      const { post } = data.editPost;

      const id = cache.identify({ _id: post._id, __typename: "Post" });

      cache.writeFragment({
        id,
        fragment: POST_FRAGMENT,
        data: data.editPost.post,
      });
      cache.evict({ fieldName: "getPosts" });
      cache.gc();
    },
  });

  const onMutation = async <T extends BasePostInput>(input: T) => {
    const mutation = post ? editPostMutation : addPostMutation;

    await mutation({ variables: { input } });
  };

  return [onMutation];
};

const useDeletePost = (_id: string) => {
  const router = useRouter();

  const onCompleted = () => {
    router.push("/");
  };

  const [deletePostMutation] = useMutation<IDeletePost>(DELETE_POST, {
    onCompleted,
    update(cache) {
      const id = cache.identify({ _id, __typename: "Post" });

      cache.evict({ id });
      cache.gc();
    },
  });

  const onDelete = async () => {
    await deletePostMutation({ variables: { input: { _id } } });
  };

  return [onDelete];
};

export { usePostMutation, useDeletePost };
