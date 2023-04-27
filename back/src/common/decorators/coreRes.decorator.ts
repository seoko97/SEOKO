import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreRes {
  @Field(() => Boolean)
  ok!: boolean;
}
