import { join } from 'path';

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const isProd = config.get('NODE_ENV') === 'production';

        return {
          playground: !isProd,
          debug: !isProd,
          autoSchemaFile: join(process.cwd(), 'schema.graphql'),
          sortSchema: true,
          uploads: false,
          cors: {
            origin: config.get('HOST'),
            credentials: true,
          },
          context: (ctx) => ({ ...ctx }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
