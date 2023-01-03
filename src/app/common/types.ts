import { AnyDto } from '@weplanx/ng';

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
   * 权限组
   */
  roles: string[];
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
   * 备用邮箱
   */
  backup_email?: string;
  /**
   * 累计会话次数
   */
  sessions?: number;
  /**
   * 最近一次登录
   */
  last?: UserLast;
  /**
   * 飞书授权
   */
  feishu?: FeishuUserData;
  /**
   * 状态
   */
  status: boolean;
}

export interface UserLast {
  timestamp: Date;
  ip: string;
  country: string;
  province: string;
  city: string;
  isp: string;
}

export interface FeishuUserData {
  access_token: string;
  token_type: string;
  expires_in: number;
  name: string;
  en_name: string;
  avatar_url: string;
  avatar_thumb: string;
  avatar_middle: string;
  avatar_big: string;
  open_id: string;
  union_id: string;
  email: string;
  enterprise_email: string;
  user_id: string;
  mobile: string;
  tenant_key: string;
  refresh_expires_in: number;
  refresh_token: string;
  sid: string;
}

export interface Log<M, T> {
  metadata: M;
  data: T;
  timestamp: Date;
}
