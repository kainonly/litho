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
