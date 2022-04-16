import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from '@posts/post.module';
import { Category, CategorySchema } from './category.model';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    forwardRef(() => PostModule),
  ],
  exports: [CategoryService],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
