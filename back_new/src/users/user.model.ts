import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@InputType('UserModel', { isAbstract: true })
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User Name' })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
