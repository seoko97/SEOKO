import { Field, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Category } from '@categories/category.model';

@ObjectType()
export class GetCategoriesRes extends CoreRes {
  @Field(() => [Category])
  categories: Category[];
}
