import { ITag } from "@queries-types/tags";
import { ICategory } from "./categories";

export interface IPost {
  _id: string;
  category: ICategory;
  content: string;
  coverImg: string;
  tags: ITag[];
  title: string;
  createdAt: string;
}

export interface IGetPost {
  getPost: {
    ok: boolean;
    error: any;
    post: IPost;
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
