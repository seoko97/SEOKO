import { IsBoolean, IsString } from "class-validator";

export class ResponseDto {
  @IsBoolean()
  readonly pass?: boolean;

  @IsString()
  readonly err?: string;
}
