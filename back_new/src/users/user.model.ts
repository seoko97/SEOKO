import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { jwtContents } from '@auth/contents';

const BCRYPT_SALT = 10 as const;
export type UserDocument = User & Document;
@Schema()
@InputType('UserModel', { isAbstract: true })
@ObjectType()
export class User extends Document {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User Name' })
  name: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User ID' })
  userId: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User Password' })
  password: string;

  @Prop({ default: null })
  @Field(() => String, { description: 'User Refresh Roken' })
  refreshToken?: string;

  @Prop({
    methods: Function,
  })
  verifyRefresh: () => boolean;

  @Prop({
    methods: Function,
  })
  comparePassword: (aPassword: string) => boolean;

  @Prop({
    statics: Function,
  })
  hashPassword: (userData: User) => void;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.verifyRefresh = function () {
  if (!this.refreshToken) return false;
  const result = verify(this.refreshToken, jwtContents.secret);

  return Boolean(result);
};

UserSchema.methods.comparePassword = async function (aPassword) {
  const isCompare = await bcrypt.compare(aPassword, this.password);

  return isCompare;
};

UserSchema.statics.hashPassword = async function (userData: User) {
  if (userData.password)
    userData.password = await bcrypt.hash(userData.password, BCRYPT_SALT);
};
