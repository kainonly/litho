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
   * 所属权限
   */
  roles: string[];
  /**
   * 所属页面
   */
  pages?: string[];
  /**
   * 只读权限
   */
  readonly?: string[];
  /**
   * 称呼
   */
  name?: string;
  /**
   * 电子邮件
   */
  email?: string[];
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 标签
   */
  labels: string[];
  /**
   * 状态
   */
  status: boolean;
}
