import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ImageResolver } from './image.resolve';
import { ImageService } from './image.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImageService, ImageResolver],
})
export class ImageModule {}
