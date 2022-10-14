import { Field, InputType } from '@nestjs/graphql';
import { ReadStream } from 'fs';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import FileUpload from 'graphql-upload/Upload.js';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

@InputType()
export class AddImageInput {
  @Field(() => GraphQLUpload)
  image: FileUpload;

  @Field(() => String)
  type: string;
}
