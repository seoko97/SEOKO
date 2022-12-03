import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_HOST')}:${configService.get(
          'DB_PORT',
        )}`,

        dbName: configService.get('DB_NAME'),
        user: configService.get('DB_USERNAME'),
        pass: configService.get('DB_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
