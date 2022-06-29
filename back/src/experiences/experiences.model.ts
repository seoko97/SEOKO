import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

export type ExperienceDocument = Experience & Document;
export interface ExperienceModel extends Model<ExperienceDocument> {
  findOrCreate: (name: string) => ExperienceDocument;
}

@Schema({ timestamps: true })
@InputType('ExperienceModel', { isAbstract: true })
@ObjectType()
export class Experience {
  @Field(() => String)
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  @Field(() => String)
  title!: string;

  @Prop({ required: true })
  @Field(() => String)
  description!: string;

  @Prop({ required: true })
  @Field(() => String)
  stratDate!: string;

  @Prop({ required: true })
  @Field(() => String)
  endDate!: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
