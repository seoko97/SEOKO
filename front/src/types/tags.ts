import { CoreResponse } from "./core";
import { IPost } from "./posts";

export interface ITag {
  _id: string;
  name: string;
  posts: IPost[] | string[];
}

export interface IGetTags {
  getTags: {
    tags: ITag[];
  } & CoreResponse;
}
