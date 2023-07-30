import { Any } from '@weplanx/ng';

export interface Operates {
  timestamp: Date;
  metadata: OperatesMetadata;
  params: string;
  body: Any;
  status: number;
  user_agent: string;
}

export interface OperatesMetadata {
  client_ip: string;
  method: string;
  path: string;
  user_id: string;
}
