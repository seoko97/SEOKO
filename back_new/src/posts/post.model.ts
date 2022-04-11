import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '@src/categories/category.model';
import { Tag } from '@src/tags/tag.model';
import { Schema as MongooseSchema, Document, Model, Types } from 'mongoose';

export type PostDocument = Post & Document;
export type PostModel = Model<PostDocument>;

@Schema({ timestamps: true })
@InputType('PostModel', { isAbstract: true })
@ObjectType()
export class Post {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String)
  title!: string;

  @Prop({ required: true })
  @Field(() => String)
  content!: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  @Field(() => Category)
  category!: Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId }],
    ref: 'Tag',
    required: false,
  })
  @Field(() => [Tag])
  tags?: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
