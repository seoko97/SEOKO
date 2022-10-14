import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddImageInput } from './dto/AddImageInput.dto';
import { AddImageRes } from './dto/ImageResponse.dto';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AddImageRes)
  async addImage(@Args('input') input: AddImageInput): Promise<AddImageRes> {
    const image = await this.imageService.addImage(input);

    return { ok: true, image };
  }
}
