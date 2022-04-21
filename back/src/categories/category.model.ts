import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '@src/posts/post.model';
import { Document, Model, Types, PopulatedDoc } from 'mongoose';

export type CategoryDocument = Category & Document;
export interface CategoryModel extends Model<CategoryDocument> {
  findOrCreate: (name: string) => CategoryDocument;
}

@Schema({ timestamps: true })
@InputType('CategoryModel', { isAbstract: true })
@ObjectType()
export class Category {
  @Field(() => String)
  _id: Types.ObjectId;

  @Prop({ required: true, index: true, unique: true })
  @Field(() => String)
  name!: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Post',
  })
  @Field(() => [Post || Types.ObjectId])
  posts?: PopulatedDoc<Post>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.statics.findOrCreate = async function (name: string) {
  const category = await this.findOne({ name });

  if (category) return category;

  return await this.create({ name });
};
