import { Module } from '@nestjs/common';

import { GraphqlModule } from './graphql.module';
import { MongoModule } from './mongo.module';

@Module({
  imports: [GraphqlModule, MongoModule],
  exports: [GraphqlModule, MongoModule],
})
export class CommonModule {}
