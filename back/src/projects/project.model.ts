import { BaseSchema } from '@common/schema/base.schema';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type ProjectDocument = Project & Document;
export type ProjectModel = Model<ProjectDocument>;
@Schema({ timestamps: true })
@InputType('ProjectModel', { isAbstract: true })
@ObjectType()
export class Project extends BaseSchema {
  @Prop({ required: true })
  @Field(() => String)
  title!: string;

  @Prop({ required: true })
  @Field(() => String)
  description!: string;

  @Prop({ required: true })
  @Field(() => String)
  content!: string;

  @Prop({ required: true })
  @Field(() => String)
  coverImg!: string;

  @Prop({ required: true })
  @Field(() => String)
  githubUrl!: string;

  @Prop({ required: true })
  @Field(() => String)
  startDate!: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  endDate?: string;

  @Prop({ required: false, default: false })
  @Field(() => Boolean)
  isTemporary?: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
