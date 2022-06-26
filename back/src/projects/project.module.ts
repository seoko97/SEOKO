import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, Projectchema } from './project.model';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: Projectchema,
      },
    ]),
  ],
  exports: [ProjectService],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
