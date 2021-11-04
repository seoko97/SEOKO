import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateuser(userId: string, password: string): Promise<any> {
    //   const user = await this.userService.get
  }
}
