import { Any, BasicDto } from '@common';

export interface User extends BasicDto {
  email: string;
  password: string;
  totp: string;
  name: string;
  roles: string[];
  sessions: number;
  history: Any;
  status: boolean;
}
