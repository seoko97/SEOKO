import { useMutation } from "@apollo/client";
import {
  IPost,
  IAddPost,
  IEditPost,
  BasePostInput,
  IAddPostVariables,
  IEditPostVariables,
} from "@queries-types/posts";
import { ADD_POST, EDIT_POST } from "@queries/post";
import { useRouter } from "next/router";

const usePostMutation = (post?: IPost) => {
  const router = useRouter();

  const onCompleted = () => {
    router.push("/");
  };

  const [addPostMutation] = useMutation<IAddPost, IAddPostVariables>(ADD_POST, {
    onCompleted,
  });

  const [editPostMutation] = useMutation<IEditPost, IEditPostVariables>(EDIT_POST, {
    onCompleted,
  });

  const onMutation = async <T extends BasePostInput>(input: T) => {
    const mutation = post ? editPostMutation : addPostMutation;

    mutation({ variables: { input } });
  };

  return [onMutation];
};

export default usePostMutation;
