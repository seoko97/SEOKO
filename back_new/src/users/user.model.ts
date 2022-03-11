import mongoose, { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type IUser = User & Document;

export const UserSchema = new mongoose.Schema({
  name: String,
});

@ObjectType()
export class User extends Document {
  @Field()
  _id: string;

  @Field()
  name: string;
}
