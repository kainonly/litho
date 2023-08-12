export interface Cluster {
  name: string;
  kind: 'kubernetes' | 'agent';
  config: string;
}
