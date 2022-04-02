import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '@src/tags/tag.model';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';

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

  @Prop({ required: true })
  @Field(() => String)
  category!: string;

  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: 'Tag' })
  @Field(() => [Tag])
  tags?: Tag[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
