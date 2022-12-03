import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CoreRes } from '@decorators/coreRes.decorator';
import { CreateUserInput } from './dto/createUser.dto';
import { User, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async create(input: CreateUserInput): Promise<CoreRes> {
    await this.userModel.hashPassword(input);

    await this.userModel.create(input);
    return { ok: true };
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

  async test() {
    return await this.userModel.find();
  }
}
