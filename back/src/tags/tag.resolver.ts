import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { CreateTagDTO } from './dto/createTag.dto';
import { GetTagsRes } from './dto/getTagsRes.dto';
import { TagService } from './tag.service';
import { SearchTagsDTO, SearchTagsInput } from './dto/searchTags.dto';
import { GetTagRes } from './dto/getTagRes.dto';

@Resolver('Tag')
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Mutation(() => CreateTagDTO)
  async createTag(@Args('input') input: string): Promise<CreateTagDTO> {
    const tag = await this.tagService.findOrCreate(input);

    return { ok: true, tag };
  }

  @Mutation(() => CoreRes)
  async deleteTag(@Args('_id') _id: string): Promise<CoreRes> {
    await this.tagService.delete(_id);

    return { ok: true };
  }

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

  @Query(() => SearchTagsDTO)
  async searchTags(
    @Args('input') input: SearchTagsInput,
  ): Promise<SearchTagsDTO> {
    const tags = await this.tagService.searchTags(input.text);
    return { ok: true, tags };
  }
}
