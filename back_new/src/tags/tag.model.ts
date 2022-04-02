import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '@src/posts/post.model';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';

export type TagDocument = Tag & Document;
export interface TagModel extends Model<TagDocument> {
  findOrCreate: (content: string) => TagDocument;
}

@Schema({ timestamps: true })
@InputType('TagModel', { isAbstract: true })
@ObjectType()
export class Tag {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  @Field(() => String, { description: 'Tag Name' })
  content!: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: 'Post' })
  posts?: Post[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.statics.findOrCreate = async function (content: string) {
  const tag = await this.findOne({ content });

  if (tag) return tag;

  return await this.create({ content });
};
