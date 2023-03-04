import { ITag } from "@queries-types/tags";
import { CoreResponse, CoreVariants } from "./core";

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

interface ISiblingPost {
  next: ISiblingItem;
  prev: ISiblingItem;
}

interface IGetPost {
  getPost: {
    post: IPost;
    siblingPost: ISiblingPost;
  } & CoreResponse;
}

interface IGetPosts {
  getPosts: IBasePosts;
}

interface IAddPost {
  addPost: CoreResponse;
}

interface IDeletePost {
  deletePost: CoreResponse;
}

interface IEditPost {
  editPost: CoreResponse;
}

interface IPostInput {
  category?: string;
  tag?: string;
  lastId?: string;
  limit?: number;
  isTemporary?: boolean;
  text?: string;
}

type IGetPostsVariables = CoreVariants<IPostInput>;

export type {
  IAddPost,
  IDeletePost,
  IEditPost,
  IGetPost,
  IGetPosts,
  IPost,
  ISiblingItem,
  ISiblingPost,
  IBasePosts,
  IPostInput,
  IGetPostsVariables,
};
