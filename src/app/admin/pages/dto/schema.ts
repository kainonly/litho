import { Field } from './field';

export interface Schema {
  /**
   * 集合名称
   */
  key: string;
  /**
   * 可编辑
   */
  actions: any[];
  /**
   * 字段设置
   */
  fields: Field[];
}
