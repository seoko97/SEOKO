import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from '@src/users/user.module';
import { databaseProviders } from './db/db.providers';
import { userProviders } from './users/user.providers';
import { UserService } from './users/user.service';
import { UserResolver } from './users/user.resolver';

const prod = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: !prod,
      debug: !prod,
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      sortSchema: true,
      cors: {
        credentials: true,
        origin: true,
      },
      context: (ctx) => ({ ...ctx }),
      typePaths: ['./**/*.graphql'],
    }),
    UserModule,
  ],
  providers: [
    UserService,
    UserResolver,
    ...databaseProviders,
    ...userProviders,
  ],
})
export class AppModule {}
