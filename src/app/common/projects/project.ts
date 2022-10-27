export interface Project {
  name: string;
  namespace: string;
  secret: string;
  entry: string[];
  expire_time: null | Date;
  labels?: Record<string, string>;
  status: boolean;
}
