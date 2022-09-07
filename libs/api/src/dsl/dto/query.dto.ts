import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class QueryDto {
  /**
   * 筛选字段格式转换
   */
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  xfilter: string[];

  /**
   * 文档字段格式转换
   */
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  xdoc: string[];

  /**
   * 筛选字段
   */
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  filter: Record<string, any>;

  /**
   * 排序规则
   */
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  sort: Record<string, any>;

  /**
   * 投影规则
   */
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  keys: Record<string, any>;

  /**
   * 最大返回数量
   */
  @IsOptional()
  @IsNumber()
  @Max(1000)
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit: number;

  /**
   * 跳过数量
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  skip: number;

  /**
   * 分页页码
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number;

  /**
   * 分页大小
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  pagesize: number;
}
