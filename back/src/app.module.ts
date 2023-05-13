import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@auth/auth.module';
import { CommonModule } from '@common/module/common.module';
import { ExperienceModule } from '@experiences/experiences.module';
import { PostModule } from '@posts/post.module';
import { ProjectModule } from '@projects/project.module';
import { SkillModule } from '@skills/skills.module';
import { TagModule } from '@tags/tag.module';
import { UserModule } from '@users/user.module';

import { ImageModule } from './images/image.module';
import { SequenceModule } from './sequence/sequence.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    SequenceModule,
    UserModule,
    AuthModule,
    TagModule,
    PostModule,
    ProjectModule,
    ExperienceModule,
    SkillModule,
    ImageModule,
  ],
})
export class AppModule {}
