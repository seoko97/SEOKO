import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

export enum SkillType {
  FRONT_END = 'FRONT_END',
  BACK_END = 'BACK_END',
  DEV_OPS = 'DEV_OPS',
}

export type SkillDocument = Skill & Document;
export interface SkillModel extends Model<SkillDocument> {
  findOrCreate: (name: string) => SkillDocument;
}

registerEnumType(SkillType, { name: 'SkillType' });

@Schema({ timestamps: true })
@InputType('SkillModel', { isAbstract: true })
@ObjectType()
export class Skill {
  @Field(() => String)
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  @Field(() => String)
  name!: string;

  @Prop({ required: true, enum: ['FRONT_END', 'BACK_END', 'DEV_OPS'] })
  @Field(() => SkillType)
  type!: SkillType;

  @Prop({ required: true })
  @Field(() => String)
  icon!: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
