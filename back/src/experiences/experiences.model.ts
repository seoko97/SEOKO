import { BaseSchema } from '@common/schema/base.schema';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type ExperienceDocument = Experience & Document;
export interface ExperienceModel extends Model<ExperienceDocument> {
  findOrCreate: (name: string) => ExperienceDocument;
}

@Schema({ timestamps: true })
@InputType('ExperienceModel', { isAbstract: true })
@ObjectType()
export class Experience extends BaseSchema {
  @Prop({ required: true, unique: true })
  @Field(() => String)
  title!: string;

  @Prop({ required: true })
  @Field(() => String)
  description!: string;

  @Prop({ required: true })
  @Field(() => String)
  startDate!: string;

  @Prop({ required: false, default: null })
  @Field(() => String, { nullable: true })
  endDate?: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
