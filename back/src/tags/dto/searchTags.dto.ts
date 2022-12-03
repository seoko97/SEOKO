import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Tag } from '../tag.model';

@InputType()
export class SearchTagsInput {
  @Field(() => String)
  text: string;
}

@ObjectType()
export class SearchTagsDTO extends CoreRes {
  @Field(() => [Tag])
  tags!: Tag[];
}
