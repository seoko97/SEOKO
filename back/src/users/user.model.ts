import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { CreateUserInput } from './dto/createUser.dto';
import { BaseSchema } from '@common/schema/base.schema';

export type UserDocument = User & Document;
export interface UserModel extends Model<UserDocument> {
  hashPassword: (userData: CreateUserInput) => void;
}

@Schema({ timestamps: true })
@InputType('UserModel', { isAbstract: true })
@ObjectType()
export class User extends BaseSchema {
  @Prop({ required: true })
  @Field(() => String, { description: 'User Name' })
  username!: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User ID' })
  userId!: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User Password' })
  password!: string;

  @Prop({ default: null })
  @Field(() => String, { description: 'User Refresh Token' })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
