import { ITag } from "@queries-types/tags";
import { CoreResponse } from "./core";

interface IPost {
  _id: string;
  content: string;
  coverImg: string;
  tags: ITag[];
  title: string;
  createdAt: string;
}

type ISiblingItem = Pick<IPost, "_id" | "title">;
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
  getPosts: {
    posts: IPost[];
  } & CoreResponse;
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

type ISearchPostItem = Pick<IPost, "_id" | "title" | "coverImg" | "createdAt">;

interface ISearchPosts {
  searchPosts: {
    posts: ISearchPostItem[];
  } & CoreResponse;
}

interface IGetPostsByTag {
  getPostsByTag: {
    posts: IPost[];
  } & CoreResponse;
}

export type {
  IAddPost,
  IDeletePost,
  IEditPost,
  IGetPost,
  IGetPosts,
  IGetPostsByTag,
  IPost,
  ISearchPostItem,
  ISearchPosts,
  ISiblingItem,
  ISiblingPost,
};
