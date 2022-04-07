import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '@src/posts/post.model';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';

export type CategoryDocument = Category & Document;
export type CategoryModel = Model<CategoryDocument>;

@Schema({ timestamps: true })
@InputType('CategoryModel', { isAbstract: true })
@ObjectType()
export class Category {
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
  @Field(() => [Post])
  posts?: Post[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
