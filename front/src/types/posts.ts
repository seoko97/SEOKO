import { ITag } from "@queries-types/tags";
import { CoreResponse, CoreVariants, CoreResult } from "./core";

interface IPost {
  _id: string;
  content: string;
  coverImg: string;
  category: string;
  tags: ITag[];
  title: string;
  createdAt: string;
  isTemporary: boolean;
  __typename?: string;
}

type ISiblingItem = Pick<IPost, "_id" | "title">;

type IBasePosts = {
  posts: IPost[];
} & CoreResponse;

interface IBasePost extends CoreResponse {
  post: IPost;
  siblingPost: ISiblingPost;
}

interface ISiblingPost {
  next: ISiblingItem;
  prev: ISiblingItem;
}

interface IGetPostInput {
  category?: string;
  tag?: string;
  lastId?: string;
  limit?: number;
  isTemporary?: boolean;
  text?: string;
}

interface BasePostInput extends Pick<IPost, "coverImg" | "title" | "content" | "category"> {
  _id?: string;
  isTemporary?: boolean;
}

interface IAddPostInput extends BasePostInput {
  tags: string[];
}

interface IEditPostInput extends BasePostInput {
  _id?: string;
  addTags?: string[];
  deleteTags?: string[];
}

type IGetPost = CoreResult<"getPost", IBasePost>;
type IGetPosts = CoreResult<"getPosts", IBasePosts>;
type IAddPost = CoreResult<"addPost">;
type IDeletePost = CoreResult<"deletePost">;
type IEditPost = CoreResult<"editPost">;

type IGetPostsVariables = CoreVariants<IGetPostInput>;
type IAddPostVariables = CoreVariants<IAddPostInput>;
type IEditPostVariables = CoreVariants<IEditPostInput>;

export type {
  IAddPost,
  IDeletePost,
  IEditPost,
  IGetPost,
  IGetPosts,
  IPost,
  ISiblingItem,
  ISiblingPost,
  BasePostInput,
  IBasePosts,
  IGetPostInput,
  IAddPostInput,
  IEditPostInput,
  IGetPostsVariables,
  IAddPostVariables,
  IEditPostVariables,
};
