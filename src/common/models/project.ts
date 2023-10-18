export interface Project {
  name: string;
  namespace: string;
  kind: string;
  secret_id?: string;
  secret_key?: string;
  entry?: string[];
  expire?: Date;
  status: boolean;
}
