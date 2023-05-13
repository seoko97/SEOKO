import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SequenceModule } from '@src/sequence/sequence.module';

import { Project, ProjectSchema } from './project.model';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    SequenceModule,
  ],
  exports: [ProjectService],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
