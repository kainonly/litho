export interface AccessLog {
  timestamp: Date;
  metadata: AccessLogMetadata;
  status: number;
  user_agent: string;
}

export interface AccessLogMetadata {
  method: string;
  host: string;
  path: string;
  ip: string;
  user_id: string;
}
