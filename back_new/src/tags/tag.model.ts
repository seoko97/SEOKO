import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '@src/posts/post.model';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';

export type TagDocument = Tag & Document;
export interface TagModel extends Model<TagDocument> {
  findOrCreate: (name: string) => TagDocument;
}

@Schema({ timestamps: true })
@InputType('TagModel', { isAbstract: true })
@ObjectType()
export class Tag {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true, unique: true })
  @Field(() => String)
  name!: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Post',
    required: false,
  })
  @Field(() => [String])
  posts?: MongooseSchema.Types.ObjectId[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.statics.findOrCreate = async function (name: string) {
  const tag = await this.findOne({ name });

  if (tag) return tag;

  return await this.create({ name });
};
