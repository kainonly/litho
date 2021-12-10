import { Field } from './field';

export interface Schema {
  /**
   * 集合名称
   */
  key: string;
  /**
   * 字段设置
   */
  fields: Record<string, Field>;
  /**
   * 规则
   */
  rules: any[];
}
