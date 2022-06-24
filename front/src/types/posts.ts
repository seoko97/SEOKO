import { ITag } from "@queries-types/tags";
import { CoreResponse } from "./core";

export interface IPost {
  _id: string;
  content: string;
  coverImg: string;
  tags: ITag[];
  title: string;
  createdAt: string;
}

export type ISiblingItem = Pick<IPost, "_id" | "title">;
export interface ISiblingPost {
  next: ISiblingItem;
  prev: ISiblingItem;
}

export interface IGetPost {
  getPost: {
    post: IPost;
    siblingPost: ISiblingPost;
  } & CoreResponse;
}

export interface IGetPosts {
  getPosts: {
    posts: IPost[];
  } & CoreResponse;
}

export interface IAddPost {
  addPost: CoreResponse;
}

export interface IDeletePost {
  deletePost: CoreResponse;
}

export interface IEditPost {
  editPost: CoreResponse;
}

export type ISearchPostItem = Pick<IPost, "_id" | "title" | "coverImg" | "createdAt">;

export interface ISearchPosts {
  searchPosts: {
    posts: ISearchPostItem[];
  } & CoreResponse;
}

export interface IGetPostsByTag {
  getPostsByTag: {
    posts: IPost[];
  } & CoreResponse;
}
