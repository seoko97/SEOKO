import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsString } from 'class-validator';
import { Document, Model } from 'mongoose';

import { BaseSchema } from '@common/schema/base.schema';

export enum SkillType {
  FRONT_END = 'FRONT_END',
  BACK_END = 'BACK_END',
  DEV_OPS = 'DEV_OPS',
}

export type SkillDocument = Skill & Document;
export type SkillModel = Model<SkillDocument>;

registerEnumType(SkillType, { name: 'SkillType' });

@Schema({ timestamps: true })
@InputType('SkillModel', { isAbstract: true })
@ObjectType()
export class Skill extends BaseSchema {
  @IsString()
  @Prop({ required: true, unique: true })
  @Field(() => String)
  name!: string;

  @IsEnum(SkillType)
  @Prop({ required: true, enum: SkillType })
  @Field(() => SkillType)
  type!: SkillType;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  icon!: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
