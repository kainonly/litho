import { Observable } from 'rxjs';
import { ListByPage } from './utils/list-by-page';

export type UploadStorage = 'default' | 'oss' | 'obs' | 'cos';
export type QueryMode = 'sql-orm' | 'mongo' | 'cloud';

export interface CurdOption {
  get: string;
  lists: string;
  originLists: string;
  add: string;
  edit: string;
  status: string;
  delete: string;
}

export interface CurdInterface {
  get?(model: string, condition: number | string | SearchOption[], order?: OrderOption, path?: string): Observable<any>;

  lists?(model: string, factory: ListByPage, option: ListsOption, path?: string): Observable<any>;

  originLists?(model: string, condition: SearchOption[], order?: OrderOption, path?: string): Observable<any>;

  add?(model: string, data: any, path?: string): Observable<any>;

  edit?(model: string, data: any, condition?: SearchOption[], path?: string): Observable<any>;

  status?(model: string, data: any, field: string, extra?: any, path?: string): Observable<any>;

  delete?(model: string, id?: any[], condition?: SearchOption[], path?: string): Observable<any>;
}

export interface SearchOption {
  field: string;
  op: string;
  value: any;
  exclude?: any[];
  format?: string;
}

export interface OrderOption {
  [field: string]: 'asc' | 'desc';
}

export interface I18nOption {
  i18n: string;
  name: object;
}

export type I18nTooltipOption =
  | {
      [key: string]: string[];
    }
  | any;

export interface I18nGroupOption {
  value?: any;
  validate?: any;
  asyncValidate?: any;
}

export interface ListByPageOption {
  id: string;
  limit?: number;
  query: SearchOption[];
  order?: OrderOption;
}

export interface ListsOption {
  refresh: boolean;
  persistence: boolean;
}
