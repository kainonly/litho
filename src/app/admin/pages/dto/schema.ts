import { Field } from './field';

export interface Schema {
  /**
   * 集合名称
   */
  key: string;
  /**
   * 可修改
   */
  modified: boolean;
  /**
   * 字段设置
   */
  fields: Field[];
}
