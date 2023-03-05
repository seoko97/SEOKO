import { CoreResponse, CoreResult } from "./core";

interface IAddImageInput {
  image: File;
}

type IAddImage = CoreResult<
  "addImage",
  {
    image: string;
  } & CoreResponse
>;

export type { IAddImageInput, IAddImage };
