import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { CreateUserInput } from './dto/createUser.dto';
import { User, UserModel } from './user.model';

const BCRYPT_SALT = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async create(input: CreateUserInput): Promise<CoreRes> {
    const inputToHashed = await this.hashPassword(input);

    await this.userModel.create(inputToHashed);

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

  async hashPassword(input: CreateUserInput) {
    if (!input.password) {
      throw new BadRequestException('비밀번호가 존재하지 않습니다.');
    }
    const hashedPassword = (await bcrypt.hash(
      input.password,
      BCRYPT_SALT,
    )) as string;

    return {
      ...input,
      password: hashedPassword,
    };
  }
}
