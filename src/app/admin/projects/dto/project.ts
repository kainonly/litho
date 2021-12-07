export interface Project {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  default: boolean;
  create_time: Date;
  update_time: Date;
}
