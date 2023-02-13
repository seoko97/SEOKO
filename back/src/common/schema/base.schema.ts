import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class BaseSchema {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
