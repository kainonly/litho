import { Schema } from './schema';

export interface Page {
  /**
   * 父节点
   */
  parent: string;
  /**
   * 显示名称
   */
  name: string;
  /**
   * 字体图标
   */
  icon?: string;
  /**
   * 种类
   */
  kind: string;
  /**
   * 数据源
   */
  schema?: Schema;

  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
}
