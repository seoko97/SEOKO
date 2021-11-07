import { Sequelize as TsSequelize } from "sequelize-typescript";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { UserResDto } from "./dto/userResDto.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private sequelize: TsSequelize,
  ) {}

  async updateRefreshToken(id: number, refreshToken: string | null) {
    await this.userModel.update({ refreshToken }, { where: { id } });
  }

  async createUser(userData): Promise<UserResDto> {
    try {
      const user = await this.userModel.findOne({
        where: { userId: userData.userId },
      });

      if (user != null) return { pass: false, err: "이미 존재하는 아이디입니다." };

      this.userModel.create(userData);
      return { pass: true, message: "회원가입 완료" };
    } catch (err) {
      return { pass: false, err };
    }
  }

  async getByUserId(userId: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: { userId },
      attributes: ["id", "password"],
    });
  }

  async getById(id: number): Promise<User | undefined> {
    return this.userModel.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });
  }
}
