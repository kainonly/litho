import { ObjectId } from 'mongodb';

export interface Department {
  /**
   * 父节点
   */
  parent?: string | ObjectId;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 更新时间
   */
  update_time: Date;
}
