import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
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

      formatResponse: (res) => {
        if (res.errors?.[0])
          res.data = { ok: false, error: res.errors?.[0]?.message };
        return res;
      },
    }),
  ],
})
export class GraphqlModule {}
