export interface User {
  id: string;
  create_time: string;
  update_time: string;
  login_time: string;
  status: boolean;
  department_id: string;
  role_id: string;
  email: string;
  phone: string;
  name: string;
  password: string;
  avatar: string;
  sessions: number;
}

export interface UserInfo {
  id: string;
  create_time: Date;
  update_time: Date;
  department: string;
  department_type: number;
  role: string;
  permissions: string[];
  email: string;
  phone: string;
  name: string;
  avatar: string;
  sessions: number;
}
