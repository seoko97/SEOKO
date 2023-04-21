import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Post } from '@posts/post.model';
import { BaseSchema } from '@common/schema/base.schema';

export type TagDocument = Tag & Document;
export interface TagModel extends Model<TagDocument> {
  findOrCreate: (name: string) => TagDocument;
}

@Schema({ timestamps: true })
@InputType('TagModel', { isAbstract: true })
@ObjectType()
export class Tag extends BaseSchema {
  @Prop({ required: true, index: true, unique: true })
  @Field(() => String)
  name!: string;

  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'Post',
    required: false,
  })
  @Field(() => [Post])
  posts?: Post[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
