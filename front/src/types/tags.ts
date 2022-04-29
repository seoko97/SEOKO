import { IPost } from "./posts";

export interface ITag {
  _id: string;
  name: string;
  posts: IPost[] | string[];
}
