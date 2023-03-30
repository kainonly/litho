export interface LoginLog {
  timestamp: Date;
  metadata: LoginLogMetadata;
  country: string;
  province: string;
  city: string;
  isp: string;
  user_agent: string;
}

export interface LoginLogMetadata {
  client_ip: string;
  user_id: string;
  channel: string;
}
