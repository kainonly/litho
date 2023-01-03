import { Log } from '@common/types';

export type LoginLog = Log<LoginLogMetaData, LoginLogData>;

export interface LoginLogMetaData {
  email: string;
  ip: string;
  token_id: string;
  user_id: string;
  channel: string;
}

export interface LoginLogData {
  ip: string;
  country: string;
  province: string;
  city: string;
  isp: string;
  user_agent: string;
}
