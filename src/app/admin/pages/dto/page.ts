import { Schema } from './schema';

export interface Page {
  _id: string;
  /**
   * 项目引用
   */
  project: string;
  /**
   * 父节点
   */
  parent: string;
  /**
   * 页面名称
   */
  name: string;
  /**
   * 字体图标
   */
  icon: string;
  /**
   * 数据源
   */
  schema: Schema;
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 修改时间
   */
  update_time: Date;

  /**
   * 自定义
   */
  [key: string]: any;
}
