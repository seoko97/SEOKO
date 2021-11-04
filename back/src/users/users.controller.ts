import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("signup")
  async createUser(@Body() data: CreateUserDto) {
    const result = await this.userService.createUser(data);
    return result;
  }
}
