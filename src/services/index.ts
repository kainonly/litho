import { client } from '@/common';

export const info = () => client.get<Response>('info', { responseType: 'none' });
export const info1 = () => client.get<Response>('info1', { responseType: 'none' });
