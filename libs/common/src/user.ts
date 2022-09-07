import { ObjectId } from 'mongodb';

export interface User {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 所属部门
   */
  department: string | ObjectId;
  /**
   * 所属权限
   */
  roles: string[] | ObjectId[];
  /**
   * 称呼
   */
  name: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 电子邮件
   */
  email: string;
  /**
   * 飞书参数
   */
  feishu: any;
  /**
   * 登录次数
   */
  sessions: number;
  /**
   * 最近登录记录
   */
  last: string;
  /**
   * 状态
   */
  status: boolean;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 更新时间
   */
  update_time: Date;
}
