import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

export type ProjectDocument = Project & Document;
export type ProjectModel = Model<ProjectDocument>;
@Schema({ timestamps: true })
@InputType('ProjectModel', { isAbstract: true })
@ObjectType()
export class Project {
  @Field(() => String)
  _id: Types.ObjectId;

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
  @Field(() => Date)
  startDate!: string;

  @Prop({ required: false })
  @Field(() => Date, { nullable: true })
  endDate!: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const Projectchema = SchemaFactory.createForClass(Project);
