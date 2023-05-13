import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document, Model } from 'mongoose';

import { BaseSchema } from '@common/schema/base.schema';

export type ExperienceDocument = Experience & Document;
export interface ExperienceModel extends Model<ExperienceDocument> {
  findOrCreate: (name: string) => ExperienceDocument;
}

@Schema({ timestamps: true })
@InputType('ExperienceModel', { isAbstract: true })
@ObjectType()
export class Experience extends BaseSchema {
  @IsString()
  @Prop({ required: true, unique: true })
  @Field(() => String)
  title!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  description!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  startDate!: string;

  @IsString()
  @Prop({ required: false, default: null })
  @Field(() => String, { nullable: true })
  endDate?: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
