import { IsIn, IsString } from 'class-validator';

export class OptionsDto {
  @IsString()
  @IsIn(['upload', 'office'])
  type: string;
}
