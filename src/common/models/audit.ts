import { Any } from '@weplanx/ng';

export interface Audit {
  timestamp: Date;
  metadata: AuditMetadata;
  params: string;
  body: Any;
  status: number;
  user_agent: string;
}

export interface AuditMetadata {
  client_ip: string;
  method: string;
  path: string;
  user_id: string;
}
