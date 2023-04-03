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
  history?: UserHistory;
  /**
   * 飞书授权
   */
  feishu?: UserFeishu;
  /**
   * 状态
   */
  status: boolean;
}

export interface UserHistory {
  timestamp: Date;
  client_ip: string;
  country: string;
  province: string;
  city: string;
  isp: string;
}

export interface UserFeishu {
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

export interface SetUserDto {
  $set: 'email' | 'name' | 'avatar' | 'password' | 'backup_email';
  email?: string;
  name?: string;
  avatar?: string;
  password?: string;
  backup_email?: string;
}

export type UnsetUserDto = 'feishu';
