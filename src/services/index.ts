import { client } from '@/common';

export const info = () => client.get<never>('info', { responseType: 'none' });
export const info1 = () => client.get<never>('info1', { responseType: 'none' });
