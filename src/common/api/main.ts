import { HttpClient } from '@common/http/client';
import { R } from '@common/rest';

export class Main {
  client!: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  login(email: string, password: string) {
    return this.client.post<R, { email: string; password: string }>(`login`, { email, password });
  }

  verify() {
    return this.client.get<Response>(`verify`, { responseType: 'none' });
  }

  code() {
    return this.client.get(`code`);
  }

  refreshToken(code: string) {
    return this.client.post<R, { code: string }>(`refresh_token`, { code });
  }

  logout() {
    return this.client.post(`logout`, {});
  }
}
