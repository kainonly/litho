import { Log } from '@common/types';

export type LoginLog = Log<LoginLogMetaData, LoginLogData>;

export interface LoginLogMetaData {
  email: string;
  ip: string;
  token_id: string;
  user_id: string;
}

export interface LoginLogData {
  detail: Record<string, any>;
  user_agent: string;
}
