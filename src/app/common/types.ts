/**
 * 用户信息
 */
export interface UserInfo {
  username: string;
  email: string;
  name: string;
  avatar: string;
  roles?: string[];
  department?: string;
  feishu?: any;
  sessions: number;
  last: string;
  create_time: number;
}
