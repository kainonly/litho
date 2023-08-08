export interface Project {
  name: string;
  namespace: string;
  secret_id?: string;
  secret_key?: string;
  entry?: string[];
  expire?: Date;
  logo?: string;
  status: boolean;
}
