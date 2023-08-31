export interface Imessage {
  topic: string;
  description?: string;
  projects: string[];
}

export interface EmqxNode {
  node: string;
  node_status: string;
  uptime: number;
  version: string;
  connections: number;
  live_connections: number;
  load1: number;
  load5: number;
  load15: number;
}
