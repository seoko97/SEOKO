import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document, Model } from 'mongoose';

import { BaseSchema } from '@common/schema/base.schema';

import { CreateUserInput } from './dto/createUser.dto';

export type UserDocument = User & Document;
export interface UserModel extends Model<UserDocument> {
  hashPassword: (userData: CreateUserInput) => void;
}

@Schema({ timestamps: true })
@InputType('UserModel', { isAbstract: true })
@ObjectType()
export class User extends BaseSchema {
  @IsString()
  @Prop({ required: true })
  @Field(() => String, { description: 'User Name' })
  username!: string;

  @IsString()
  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User ID' })
  userId!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String, { description: 'User Password' })
  password!: string;

  @Prop({ default: null })
  @Field(() => String, { description: 'User Refresh Token' })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
