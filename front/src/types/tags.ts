import { CoreResponse } from "./core";
import { IPost } from "./posts";

interface ITag {
  _id: string;
  name: string;
  posts: IPost[] | string[];
}

interface IGetTags {
  getTags: {
    tags: ITag[];
  } & CoreResponse;
}

export type { IGetTags, ITag };
