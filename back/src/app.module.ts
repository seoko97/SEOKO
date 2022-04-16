import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import { CategoryModule } from '@categories/category.module';
import { CommonModule } from '@common/common.module';
import { PostModule } from '@posts/post.module';
import { TagModule } from '@tags/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    UserModule,
    AuthModule,
    TagModule,
    PostModule,
    CategoryModule,
  ],
})
export class AppModule {}
