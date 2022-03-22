import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/createUser.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: CreateUserInput): Promise<User> {
    return await this.userModel.create(input);
  }

  async getByUserId(userId: string) {
    return this.userModel.findOne({ userId }, { _id: 1, password: 1 });
  }

  async getById(_id: string) {
    return this.userModel.findById(_id, { password: 0 });
  }

  async updateRefreshToken(_id: string, refreshToken: string | null) {
    await this.userModel.updateOne({ _id }, { refreshToken });
  }
}
