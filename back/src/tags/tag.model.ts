import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Post } from '@posts/post.model';

export type TagDocument = Tag & Document;
export interface TagModel extends Model<TagDocument> {
  findOrCreate: (name: string) => TagDocument;
}

@Schema({ timestamps: true })
@InputType('TagModel', { isAbstract: true })
@ObjectType()
export class Tag {
  @Field(() => String)
  _id: Types.ObjectId;

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
