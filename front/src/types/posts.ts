import { ITag } from "@queries-types/tags";
import { CoreResponse } from "./core";

interface IPost {
  _id: string;
  content: string;
  coverImg: string;
  category: string;
  tags: ITag[];
  title: string;
  createdAt: string;
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

interface ISearchPosts {
  searchPosts: IBasePosts;
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

export type {
  IAddPost,
  IDeletePost,
  IEditPost,
  IGetPost,
  IGetPosts,
  IPost,
  ISearchPosts,
  ISiblingItem,
  ISiblingPost,
  IBasePosts,
};
