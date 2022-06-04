import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types, PopulatedDoc } from 'mongoose';
import { Post } from '@src/posts/post.model';

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
  @Field(() => [Post || Types.ObjectId])
  posts?: (Types.ObjectId | Post)[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.statics.findOrCreate = async function (name: string) {
  const tag = await this.findOne({ name });

  if (tag) return tag;

  return await this.create({ name });
};
