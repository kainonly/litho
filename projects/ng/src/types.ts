export type AnyDto<T> = T & BasicDto;
export type R = Record<string, any>;
export interface BasicDto extends R {
  _id: string;
  create_time: Date;
  update_time: Date;
}
export type Filter<T> = Partial<{ [P in keyof AnyDto<T>]: any }>;
export type Update<T> = { [op: string]: Partial<{ [P in keyof AnyDto<T>]: any }> };
export type Sort<T> = Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
export type XFilter = 'oid' | 'oids' | 'date' | 'dates' | 'timestamp' | 'timestamps';
export type XData = 'oid' | 'oids' | 'date' | 'dates' | 'timestamp' | 'timestamps' | 'password';
export interface ApiOptions<T> {
  keys?: Array<keyof AnyDto<T>>;
  sort?: Map<keyof AnyDto<T>, -1 | 1>;
  page?: number;
  pagesize?: number;
  xfilter?: Record<string, XFilter>;
  xdata?: Record<string, XData>;
  txn?: string;
}
export type FilterOption<T> = Pick<ApiOptions<T>, 'xfilter'>;
export type CreateOption<T> = Pick<ApiOptions<T>, 'xdata' | 'txn'>;
export type FindOption<T> = Omit<ApiOptions<T>, 'xdata' | 'txn'>;
export type FindResult<T> = {
  data: Array<AnyDto<T>>;
  total: number;
};
export type FindOneOption<T> = Pick<ApiOptions<T>, 'keys' | 'xfilter'>;
export type FindByIdOption<T> = Pick<ApiOptions<T>, 'keys'>;
export type UpdateOption<T> = Pick<ApiOptions<T>, 'xfilter' | 'xdata' | 'txn'>;
export type UpdateOneByIdOption<T> = Pick<ApiOptions<T>, 'xdata' | 'txn'>;
export type ReplaceOption<T> = Pick<ApiOptions<T>, 'xdata' | 'txn'>;
export type DeleteOption<T> = Pick<ApiOptions<T>, 'txn'>;
export type BulkDeleteOption<T> = Pick<ApiOptions<T>, 'xfilter' | 'txn'>;
export type SortOption<T> = Pick<ApiOptions<T>, 'txn'>;

export interface TransactionResult {
  txn: string;
}

export interface LoadOption {
  url: string;
  plugins: string[];
}
