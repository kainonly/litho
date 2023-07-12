import { Params } from '@common/http/params';
import { HttpClient } from '@common/http/client';

export interface HttpOptions<D> {
  headers?: Headers;
  params?: Params;
  body?: D | FormData | URLSearchParams;
  responseType?: 'none' | 'json';
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache;
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials;
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /** A boolean to set request's keepalive. */
  keepalive?: boolean;
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  mode?: RequestMode;
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: RequestRedirect;
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  referrer?: string;
}

export type DefaultHttpOptions = Omit<HttpOptions<never>, 'params' | 'body'>;

export type R = Record<string, any>;
export interface BasicDto extends R {
  _id: string;
  create_time: Date;
  update_time: Date;
}
export type AnyDto<T> = T & BasicDto;
export type Filter<T> = Partial<{ [P in keyof AnyDto<T>]: any }>;
export type Sort<T> = Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
export type XFilter = 'oid' | 'oids' | 'date' | 'dates' | 'timestamp' | 'timestamps';
export type XData = 'oid' | 'oids' | 'date' | 'dates' | 'timestamp' | 'timestamps' | 'password';
export interface RestOptions<T> {
  keys?: Array<keyof AnyDto<T>>;
  sort?: Map<keyof AnyDto<T>, -1 | 1>;
  page?: number;
  pagesize?: number;
  xfilter?: Record<string, XFilter>;
  xdata?: Record<string, XData>;
  txn?: string;
}
export type FilterOption<T> = Pick<RestOptions<T>, 'xfilter'>;
export type CreateOption<T> = Pick<RestOptions<T>, 'xdata' | 'txn'>;
export type FindOption<T> = Omit<RestOptions<T>, 'xdata' | 'txn'>;
export type FindOneOption<T> = Pick<RestOptions<T>, 'keys' | 'xfilter'>;
export type FindByIdOption<T> = Pick<RestOptions<T>, 'keys'>;
export type UpdateOption<T> = Pick<RestOptions<T>, 'xfilter' | 'xdata' | 'txn'>;
export type UpdateOneByIdOption<T> = Pick<RestOptions<T>, 'xdata' | 'txn'>;
export type ReplaceOption<T> = Pick<RestOptions<T>, 'xdata' | 'txn'>;
export type DeleteOption<T> = Pick<RestOptions<T>, 'txn'>;
export type BulkDeleteOption<T> = Pick<RestOptions<T>, 'xfilter' | 'txn'>;
export type SortOption<T> = Pick<RestOptions<T>, 'txn'>;
export interface TransactionResult {
  txn: string;
}

export interface BasicState<T> {
  items: T[];
  pending: boolean;
  error: null | Error;
}
