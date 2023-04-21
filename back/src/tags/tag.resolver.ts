import { Args, Query, Resolver } from '@nestjs/graphql';

import { GetTagRes } from './dto/getTagRes.dto';
import { GetTagsRes } from './dto/getTagsRes.dto';
import { TagService } from './tag.service';

@Resolver('Tag')
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => GetTagRes)
  async getTag(@Args('input') input: string) {
    const tag = await this.tagService.getTag(input);

    return { tag };
  }

  @Query(() => GetTagsRes)
  async getTags() {
    const tags = await this.tagService.getTags();
    return { tags };
  }
}
