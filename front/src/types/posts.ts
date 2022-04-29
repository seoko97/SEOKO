import { ITag } from "@queries-types/tags";
import { ICategory } from "./categories";

export interface IPost {
  _id: string;
  category: ICategory;
  content: string;
  coverImg: string;
  tags: ITag[];
  title: string;
}

export interface IGetPosts {
  getPosts: {
    ok: boolean;
    error: any;
    posts: IPost[];
  };
}
