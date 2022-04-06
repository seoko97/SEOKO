import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({ required: false, default: 0 })
  @Field(() => Number)
  postCount?: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
