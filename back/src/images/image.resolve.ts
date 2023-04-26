import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

import { AddImageInput } from './dto/AddImageInput.dto';
import { AddImageRes } from './dto/ImageResponse.dto';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AddImageRes)
  async addImage(@Args('input') input: AddImageInput) {
    const image = await this.imageService.addImage(input);

    return { image };
  }
}
