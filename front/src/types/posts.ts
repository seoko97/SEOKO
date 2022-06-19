import { ITag } from "@queries-types/tags";

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
    ok: boolean;
    error: any;
    post: IPost;

    siblingPost: ISiblingPost;
  };
}

export interface IGetPosts {
  getPosts: {
    ok: boolean;
    error: any;
    posts: IPost[];
  };
}

export interface IAddPost {
  addPost: {
    ok: boolean;
    error: any;
  };
}

export interface IDeletePost {
  deletePost: {
    ok: boolean;
    error: any;
  };
}

export interface IEditPost {
  editPost: {
    ok: boolean;
    error: any;
  };
}

export type ISearchPostItem = Pick<IPost, "_id" | "title" | "coverImg" | "createdAt">;

export interface ISearchPosts {
  searchPosts: {
    ok: boolean;
    error: any;
    posts: ISearchPostItem[];
  };
}
