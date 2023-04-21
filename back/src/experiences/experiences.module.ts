import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Experience, ExperienceSchema } from './experiences.model';
import { ExperienceResolver } from './experiences.resolver';
import { ExperienceService } from './experiences.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Experience.name,
        schema: ExperienceSchema,
      },
    ]),
  ],
  exports: [ExperienceService],
  providers: [ExperienceResolver, ExperienceService],
})
export class ExperienceModule {}
