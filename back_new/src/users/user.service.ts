import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/createUser.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}
  async test(): Promise<User[]> {
    return await this.userModel.find();
  }

  async create(input: CreateUserInput): Promise<User> {
    return await this.userModel.create(input);
  }
}
