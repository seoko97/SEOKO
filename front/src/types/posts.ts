import { ITag } from "@queries-types/tags";
import { CoreResponse, CoreVariables, CoreResult } from "./core";

interface IPost {
  _id: string;
  content: string;
  coverImg: string;
  category: string;
  tags: ITag[];
  title: string;
  createdAt: string;
  isTemporary: boolean;
  numId: number;
  __typename?: string;
}

type ISiblingItem = Pick<IPost, "_id" | "title" | "numId">;

type IBasePosts = {
  posts: IPost[];
} & CoreResponse;

interface IBasePost extends CoreResponse {
  post: IPost;
}
interface IBasePostResponse extends IBasePost {
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
  tags?: string[];
}

interface IEditPostInput extends BasePostInput {
  _id?: string;
  addTags?: string[];
  deleteTags?: string[];
}

type IGetPost = CoreResult<"getPost", IBasePostResponse>;
type IGetPosts = CoreResult<"getPosts", IBasePosts>;
type IAddPost = CoreResult<"addPost", IBasePost>;
type IEditPost = CoreResult<"editPost", IBasePost>;
type IDeletePost = CoreResult<"deletePost">;

type IGetPostsVariables = CoreVariables<IGetPostInput>;
type IAddPostVariables = CoreVariables<IAddPostInput>;
type IEditPostVariables = CoreVariables<IEditPostInput>;

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
  IBasePostResponse,
};
