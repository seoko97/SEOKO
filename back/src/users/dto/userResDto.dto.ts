import { IsString } from "class-validator";
import { ResponseDto } from "@common/dto/responseRusult.dto";

export class UserResDto extends ResponseDto {
  @IsString()
  readonly message?: string;

  @IsString()
  readonly username?: string;
}
