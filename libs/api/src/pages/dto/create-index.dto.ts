import { IsBoolean } from 'class-validator';
import { IndexSpecification } from 'mongodb';

export class CreateIndexDto {
  keys: IndexSpecification;

  @IsBoolean()
  unique: boolean;
}
