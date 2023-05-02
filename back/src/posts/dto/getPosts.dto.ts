import { applyDecorators } from '@nestjs/common';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { Post } from '../post.model';

export const IsOptionalCustom = (_decorator: PropertyDecorator) =>
  applyDecorators(IsOptional(), _decorator);

@InputType()
export class GetPostsInput extends PickType(Post, ['isTemporary']) {
  @IsOptionalCustom(IsString())
  @Field(() => String, { nullable: true })
  category?: string;

  @IsOptionalCustom(IsString())
  @Field(() => String, { nullable: true })
  lastId?: string;

  @IsOptionalCustom(IsNumber())
  @Field(() => Number, { nullable: true })
  limit?: number;

  @IsOptionalCustom(IsString())
  @Field(() => String, { nullable: true })
  tag?: string;

  @IsOptionalCustom(IsString())
  @Field(() => String, { nullable: true })
  text?: string;
}

@ObjectType()
export class GetPostsDTO extends CoreRes {
  @Field(() => [Post])
  posts!: Post[];
}
