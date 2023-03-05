import { CoreResponse, CoreResult } from "./core";
import { IPost } from "./posts";

interface ITag {
  _id: string;
  name: string;
  posts: IPost[];
}

type IGetTags = CoreResult<
  "getTags",
  {
    tags: ITag[];
  } & CoreResponse
>;
type IGetTag = CoreResult<
  "getTag",
  {
    tag: ITag;
  } & CoreResponse
>;

export type { IGetTags, IGetTag, ITag };
