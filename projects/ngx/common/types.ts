import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { StorageMap } from '@ngx-pwa/local-storage';
import { FieldOption } from '@weplanx/ngx/lowcode';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

export interface APIOption {
  http: HttpClient;
  baseUrl: string;
  model: string;
}

export interface APIResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface PageData<T> {
  value: T[];
  total: number;
}

export interface Field {
  key: string;
  label: string;
  type: string;
  description?: string;
  keyword?: boolean;
}

export interface CollectionOption {
  key: string;
  storage: StorageMap;
  fields: Field[];
}

export interface CollectionValue {
  _id: string;
  disabled?: boolean;
}

export interface CollectionStorageValue {
  pageSize: 10 | 20 | 30 | 40 | 50;
  pageIndex: number;
  columns: NzCheckBoxOptionInterface[];
  columnsHeight: NzTableSize;
  columnsWidth: Record<string, string>;
  searchText: string;
  searchOptions: Record<string, SearchOption>;
  sortOptions: Record<string, NzTableSortOrder>;
}

export interface SearchOption {
  operator: string;
  value: unknown;
}

export interface SearchValue {
  [operator: string]: unknown;
}

export type Upload = string | UploadOption;

export interface UploadOption {
  url: string;
  storage?: UploadStorage;
  fetchSigned?: string;
  fetchSignedMethod?: string;
  size?: number;
}

export interface UploadSignedResponse {
  filename: string;
  option: Record<string, any>;
}

export type UploadStorage = 'default' | 'oss' | 'obs' | 'cos';
