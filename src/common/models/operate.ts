import { Any } from '@weplanx/ng';

export interface Operate {
  timestamp: Date;
  metadata: OperateMetadata;
  params: string;
  body: Any;
  status: number;
  user_agent: string;
}

export interface OperateMetadata {
  client_ip: string;
  method: string;
  path: string;
  user_id: string;
}
