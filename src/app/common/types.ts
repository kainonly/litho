export interface Project {
  /**
   * 项目名称
   */
  name: string;
  /**
   * 命名空间
   */
  namespace: string;
  /**
   * 密钥
   */
  secret?: string;
  /**
   * 白名单
   */
  entry: string[];
  /**
   * 有效期
   */
  expire: number;
  /**
   * 状态
   */
  status: boolean;
}

export interface User {
  /**
   * 电子邮件
   */
  email: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 称呼
   */
  name: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 累计会话次数
   */
  sessions?: number;
  /**
   * 最近一次登录
   */
  last?: string;
  /**
   * 状态
   */
  status: boolean;
}

export type UserInfo = Pick<User, 'email' | 'name' | 'avatar'>;

export interface Log<M, T> {
  metadata: M;
  data: T;
  timestamp: Date;
}
