import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '@src/categories/category.model';
import { Tag } from '@src/tags/tag.model';
import { Document, Model, Types, PopulatedDoc } from 'mongoose';

export type PostDocument = Post & Document;
export type PostModel = Model<PostDocument>;
@Schema({ timestamps: true })
@InputType('PostModel', { isAbstract: true })
@ObjectType()
export class Post {
  @Field(() => String)
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String)
  title!: string;

  @Prop({ required: true })
  @Field(() => String)
  content!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  @Field(() => Category || Types.ObjectId)
  category!: PopulatedDoc<Category>;

  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'Tag',
    required: false,
  })
  @Field(() => [Tag || Types.ObjectId])
  tags?: Types.ObjectId[] | Tag[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
