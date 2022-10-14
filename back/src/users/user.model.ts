import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from '@auth/contants';
import { CreateUserInput } from './dto/createUser.dto';

const BCRYPT_SALT = 10;
export type UserDocument = User & Document;
export interface UserModel extends Model<UserDocument> {
  hashPassword: (userData: CreateUserInput) => void;
}

@Schema({ timestamps: true })
@InputType('UserModel', { isAbstract: true })
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

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

  verifyRefresh: () => boolean;
  comparePassword: (aPassword: string) => Promise<boolean>;

  @Field(() => Date)
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.verifyRefresh = function () {
  if (!this.refreshToken) return false;
  const result = verify(this.refreshToken, jwtConstants.secret);

  return Boolean(result);
};

UserSchema.methods.comparePassword = async function (aPassword: string) {
  const isCompare = await bcrypt.compare(aPassword, this.password);

  return isCompare;
};

UserSchema.statics.hashPassword = async function (userData: CreateUserInput) {
  if (userData.password)
    userData.password = await bcrypt.hash(userData.password, BCRYPT_SALT);
};
