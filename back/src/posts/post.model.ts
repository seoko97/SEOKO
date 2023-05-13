import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Document, Model, Types } from 'mongoose';

import { BaseSchema } from '@common/schema/base.schema';
import { Tag } from '@tags/tag.model';

export enum CATEGORY {
  DEV = 'dev',
  DAILY = 'daily',
}

export type PostDocument = Post & Document;
export type PostModel = Model<PostDocument>;
@Schema({ timestamps: true })
@InputType('PostModel', { isAbstract: true })
@ObjectType()
export class Post extends BaseSchema {
  @IsNumber()
  @Field(() => Number)
  @Prop({ require: true, unique: true })
  numId!: number;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  title!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  content!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @IsEnum(CATEGORY)
  @IsOptional()
  @Prop({ required: true, enum: CATEGORY })
  @Field(() => String)
  category!: CATEGORY;

  @IsBoolean()
  @IsOptional()
  @Prop({ required: false, default: false })
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  isTemporary?: boolean;

  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'Tag',
    required: false,
    default: [],
  })
  @Field(() => [Tag])
  tags?: Tag[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
