import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class SetUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsIn(['weixin', 'feishu', 'dingtalk'])
  type: string;
}
