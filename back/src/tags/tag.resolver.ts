import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetTagsRes } from './dto/getTagsRes.dto';
import { TagService } from './tag.service';
import { GetTagRes } from './dto/getTagRes.dto';

@Resolver('Tag')
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => GetTagRes)
  async getTag(@Args('input') input: string) {
    const tag = await this.tagService.getTag(input);

    return { ok: true, tag };
  }

  @Query(() => GetTagsRes)
  async getTags(): Promise<GetTagsRes> {
    const tags = await this.tagService.getTags();
    return { ok: true, tags };
  }
}
