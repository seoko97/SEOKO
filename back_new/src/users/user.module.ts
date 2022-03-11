import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/db/db.module';
import { userProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService, ...userProviders],
})
export class UserModule {}
