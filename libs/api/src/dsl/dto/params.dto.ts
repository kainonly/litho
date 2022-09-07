import { IsMongoId, IsOptional, Matches } from 'class-validator';

export class ParamsDto {
  /**
   * 模型命名
   */
  @Matches(/^[a-z_]+$/, {
    message: 'please use standard collection name',
  })
  model: string;

  /**
   * 文档 ID
   */
  @IsOptional()
  @IsMongoId()
  id: string;
}
