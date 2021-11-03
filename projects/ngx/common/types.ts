import { HttpClient } from '@angular/common/http';

import { StorageMap } from '@ngx-pwa/local-storage';
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

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

export interface CollectionOption {
  key: string;
  storage: StorageMap;
}

export interface CollectionValue {
  _id: string;
  disabled?: boolean;
}

export interface PageData<T> {
  value: T[];
  total: number;
}

export interface CollectionStorageValue {
  limit: 10 | 20 | 30 | 40 | 50;
  index: number;
  height: NzTableSize;
}
