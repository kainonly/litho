import { User } from '@prisma/client';

export interface ActiveData {
  jti: string;
  user: User;
}
