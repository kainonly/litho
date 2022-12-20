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

/**
 * 用户信息
 */
export interface UserInfo {
  username: string;
  email: string;
  name: string;
  avatar: string;
  roles: string[];
  department?: string;
  feishu?: any;
  sessions: number;
  last_time: string;
  create_time: number;
}

export interface Nav {
  name: string;
  icon: string;
  routerLink: string[];
}
