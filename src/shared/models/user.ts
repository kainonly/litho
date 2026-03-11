export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  login_at: string;
  active: boolean;
  org_id: string;
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
  created_at: Date;
  updated_at: Date;
  org: string;
  org_type: number;
  role: string;
  cabs: string[];
  email: string;
  phone: string;
  name: string;
  avatar: string;
  sessions: number;
}
