import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';

const prod = process.env.NODE_ENV === 'production';

@Module({
  imports: [
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
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.exception.code || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphqlModule {}
