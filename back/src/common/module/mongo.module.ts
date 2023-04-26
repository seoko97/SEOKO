import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { ConnectionStore } from '@utils/ConnectionStore';
import { transactionPlugin } from '@utils/mongoosePluginCb';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
        dbName: configService.get('DB_NAME'),
        user: configService.get('DB_USERNAME'),
        pass: configService.get('DB_PASSWORD'),

        connectionFactory: (connection: Connection) => {
          connection.plugin(transactionPlugin);

          new ConnectionStore().setConnection(connection);

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
