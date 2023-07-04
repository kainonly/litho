import { http } from '@common/http';

export const info = () => http.get<Response>('info', { responseType: 'none' });
export const info1 = () => http.get<Response>('info1', { responseType: 'none' });
