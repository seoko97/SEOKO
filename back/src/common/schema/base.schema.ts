import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';

@Schema({ timestamps: true })
@ObjectType()
export class BaseSchema {
  @IsMongoId()
  @Field(() => String)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
