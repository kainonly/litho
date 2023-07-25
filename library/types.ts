export type Any = any; // eslint-disable-line
export type AnyDto<T> = T & BasicDto;
export type R = { [key: string]: Any };
export interface BasicDto extends R {
  _id: string;
  create_time: Date;
  update_time: Date;
}
export type FieldOperators<Type> = Partial<{
  $eq: Type;
  $gt: Type;
  $gte: Type;
  $in: Type[];
  $lt: Type;
  $lte: Type;
  $ne: Type;
  $nin: Type[];
  $regex: string;
  $exists: boolean;
}>;
export type Operators = Partial<{
  $and: Any[];
  $not: Any;
  $nor: Any;
  $or: Any[];
  $text: Partial<{
    $search: string;
    $language: string;
    $caseSensitive: boolean;
    $diacriticSensitive: boolean;
  }>;
}>;
export type Filter<T> = Partial<{ [P in keyof AnyDto<T>]: AnyDto<T>[P] | FieldOperators<AnyDto<T>[P]> }> &
  Operators &
  R;
export type UpdateOperators<T> = {
  $inc: Partial<{ [P in keyof AnyDto<T>]: number }> & { [key: string]: number };
  $rename: Partial<{ [P in keyof AnyDto<T>]: string }> & { [key: string]: string };
  $set: Partial<{ [P in keyof AnyDto<T>]: AnyDto<T>[P] }> & R;
  $unset: Partial<{ [P in keyof AnyDto<T>]: '' }> & { [key: string]: '' };
};
export type Update<T> = Partial<UpdateOperators<T>>;
export type Sort<T> = Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
export type XFilter = { [key: string]: XFilterKind };
export type XFilterKind = 'oid' | 'oids' | 'date' | 'dates' | 'timestamp' | 'timestamps';
export type XData = { [key: string]: XDataKind };
export type XDataKind = 'oid' | 'oids' | 'date' | 'dates' | 'timestamp' | 'timestamps' | 'password';
export interface ApiOptions<T> {
  keys?: Array<keyof AnyDto<T>>;
  sort?: Map<keyof AnyDto<T>, -1 | 1>;
  page?: number;
  pagesize?: number;
  xfilter?: XFilter;
  xdata?: XData;
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

export interface WpxModelStore<T> {
  searchText: string;
  keywords: Any[];
  page: number;
  pagesize: number;
}

export interface UploadOption {
  type: 'cos';
  url: string;
  limit: number;
}
