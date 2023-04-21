import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class BaseSchema {
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
