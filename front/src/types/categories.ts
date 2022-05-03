import { IPost } from "./posts";

export interface ICategory {
  _id: string;
  name: string;
  posts: IPost[] | string[];
}

export interface IGetCategories {
  getCategories: {
    ok: boolean;
    error: any;
    categories: ICategory[];
  };
}
