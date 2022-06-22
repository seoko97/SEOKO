import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const DATABASE_NAME = 'seoko_server';
// const DATABASE_NAME = process.env.DB_NAME;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb://localhost/${DATABASE_NAME}`,
      }),
    }),
  ],
})
export class MongoModule {}
