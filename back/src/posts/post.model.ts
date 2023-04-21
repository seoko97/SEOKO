import { BaseSchema } from '@common/schema/base.schema';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '@tags/tag.model';
import { Document, Model, Types } from 'mongoose';

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
  @Prop({ required: true })
  @Field(() => String)
  title!: string;

  @Prop({ required: true })
  @Field(() => String)
  content!: string;

  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @Prop({ required: true, enum: CATEGORY })
  @Field(() => String)
  category!: CATEGORY;

  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'Tag',
    required: false,
    default: [],
  })
  @Field(() => [Tag])
  tags?: Tag[];

  @Prop({ required: false, default: false })
  @Field(() => Boolean)
  isTemporary?: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
