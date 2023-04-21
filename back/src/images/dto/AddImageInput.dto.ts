import { ReadStream } from 'fs';

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import FileUpload from 'graphql-upload/Upload.js';

@ObjectType()
export class FileUpload {
  @IsString()
  @Field(() => String)
  filename: string;
  mimetype: string;
  encoding: string;

  @IsOptional()
  createReadStream: () => ReadStream;
}

@InputType()
export class AddImageInput {
  @IsOptional()
  @Type(() => FileUpload)
  @Field(() => GraphQLUpload)
  image: FileUpload;

  @IsString()
  @Field(() => String)
  type: string;
}
