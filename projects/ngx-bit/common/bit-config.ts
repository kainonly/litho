import { Injectable } from '@angular/core';

import { CurdOption, I18nOption, UploadStorage } from './types';

@Injectable({
  providedIn: 'root'
})
export class BitConfig {
  url!: {
    api: string;
    static?: string;
  };
  api: {
    namespace?: string;
    withCredentials?: boolean;
    upload?: string;
    uploadStorage?: UploadStorage;
    uploadFetchSigned?: string;
    uploadFetchSignedMethod?: string;
    uploadSize?: number;
  } = {};
  curd: CurdOption = {
    get: '/get',
    lists: '/lists',
    originLists: '/originLists',
    add: '/add',
    edit: '/edit',
    status: '/edit',
    delete: '/delete'
  };
  col: {
    [key: string]: object;
  } = {};
  locale?: {
    default: string;
    mapping: string[];
    bind: any[];
  };
  i18n?: {
    default: string;
    contain: string[];
    switch: I18nOption[];
  };
  page: number = 10;
  query: 'sql-orm' | 'mongo' | 'cloud' = 'sql-orm';
}
