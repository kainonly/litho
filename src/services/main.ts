import { http } from '@common/http';
import { R } from '@common/types';

export const main = {
  login: (email: string, password: string) =>
    http.post<R, { email: string; password: string }>(`login`, { email, password }),
  verify: () => http.get<Response>(`verify`, { responseType: 'none' }),
  code: () => http.get(`code`),
  refreshToken: (code: string) => http.post<R, { code: string }>(`refresh_token`, { code }),
  logout: () => http.post(`logout`, {})
};
