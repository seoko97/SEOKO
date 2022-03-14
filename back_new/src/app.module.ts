import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from '@users/user.module';
import { UserService } from '@users/user.service';
import { UserResolver } from '@users/user.resolver';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule, UserModule],
})
export class AppModule {}
