import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CoreRes } from '@src/decorators/coreRes.decorator';
import { CreateTagDTO } from './dto/createTag.dto';
import { TagService } from './tag.service';

@Resolver('Tag')
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Mutation(() => CreateTagDTO)
  async createTag(@Args('input') input: string) {
    const tag = await this.tagService.findOrCreate(input);

    return { ok: true, tag };
  }
}
