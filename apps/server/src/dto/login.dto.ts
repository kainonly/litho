import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  identity: string;

  @IsString()
  password: string;
}
