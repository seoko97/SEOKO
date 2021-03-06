import { Field, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Tag } from '../tag.model';

@ObjectType()
export class CreateTagDTO extends CoreRes {
  @Field(() => Tag)
  tag: Tag;
}
