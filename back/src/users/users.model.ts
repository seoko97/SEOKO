import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { jwtContents } from "@auth/contents";

const BCRYPT_SALT = 10 as const;

@Table({ tableName: "user", modelName: "User", timestamps: true, paranoid: true })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
  readonly id!: number;

  @Column({ type: DataType.STRING(15), unique: true })
  userId!: string;

  @Column({ type: DataType.STRING(20) })
  password!: string;

  @Column({ type: DataType.STRING(20) })
  username!: string;

  @Column({ type: DataType.STRING(400), allowNull: true })
  @Exclude()
  refreshToken?: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(userData: User) {
    if (!userData.password) return;
    userData.password = await bcrypt.hash(userData.password, BCRYPT_SALT);
  }

  async comparePassword(aPassword) {
    const isCompare = await bcrypt.compare(aPassword, this.password);

    return isCompare;
  }

  verifyRefresh() {
    if (!this.refreshToken) return false;
    const result = verify(this.refreshToken, jwtContents.secret);

    return Boolean(result);
  }
}
