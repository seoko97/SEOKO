import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Document, Model } from 'mongoose';

import { BaseSchema } from '@common/schema/base.schema';

export type ProjectDocument = Project & Document;
export type ProjectModel = Model<ProjectDocument>;
@Schema({ timestamps: true })
@InputType('ProjectModel', { isAbstract: true })
@ObjectType()
export class Project extends BaseSchema {
  @IsNumber()
  @Field(() => Number)
  @Prop({ require: true })
  numId!: number;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  title!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  description!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  content!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  githubUrl!: string;

  @IsString()
  @Prop({ required: true })
  @Field(() => String)
  startDate!: string;

  @IsString()
  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  @Prop({ required: false, default: false })
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  isTemporary?: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
