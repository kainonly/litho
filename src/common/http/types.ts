import { Params } from './params';

export interface Options {
  header?: Headers;
  params?: Params;
  body?: any;
  responseType?: 'none' | 'json';
  withCredentials?: boolean;
}
