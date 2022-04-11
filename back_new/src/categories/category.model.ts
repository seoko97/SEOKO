import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '@src/posts/post.model';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';

export type CategoryDocument = Category & Document;
export interface CategoryModel extends Model<CategoryDocument> {
  findOrCreate: (name: string) => CategoryDocument;
}

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
  })
  @Field(() => [Post])
  posts?: MongooseSchema.Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.statics.findOrCreate = async function (name: string) {
  console.log('@@@', name);
  const category = await this.findOne({ name });

  if (category) return category;

  return await this.create({ name });
};
