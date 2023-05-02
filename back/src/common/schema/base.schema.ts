import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { IsMongoId, IsTimeZone } from 'class-validator';

@Schema({ timestamps: true, _id: true })
@ObjectType()
export class BaseSchema {
  @IsMongoId()
  @Field(() => String)
  _id: string;

  @IsTimeZone()
  @Field(() => Date)
  createdAt: Date;

  @IsTimeZone()
  @Field(() => Date)
  updatedAt: Date;
}
