export interface User {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 所属部门
   */
  departments: string[];
  /**
   * 所属权限
   */
  roles: string[];
  /**
   * 称呼
   */
  name?: string;
  /**
   * 电子邮件
   */
  email?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 地区
   */
  region?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 简介
   */
  introduction?: string;
  /**
   * 标签
   */
  labels: string[];
  /**
   * 状态
   */
  status: boolean;
}
