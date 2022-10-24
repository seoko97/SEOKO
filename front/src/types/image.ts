import { CoreResponse } from "./core";

export interface IAddImageInput {
  image: File;
}

export interface IAddImage {
  addImage: {
    image: string;
  } & CoreResponse;
}
