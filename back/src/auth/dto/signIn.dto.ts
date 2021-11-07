import { IsNotEmpty, IsString } from "class-validator";
import { ResponseDto } from "@common/dto/responseRusult.dto";

export class SignInDto extends ResponseDto {
  @IsString()
  @IsNotEmpty()
  readonly username!: string;
}
