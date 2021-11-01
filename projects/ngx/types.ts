import { HttpClient } from '@angular/common/http';

import { StorageMap } from '@ngx-pwa/local-storage';

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

export interface ApiOption {
  http: HttpClient;
  baseUrl: string;
  model: string;
}

export interface APIResponse<T> {
  code: number;
  data?: T;
  message: string;
}

export interface DataLists<T> {
  total: number;
  lists: T;
}

export interface ListsOption {
  id: string;
  where?: Record<string, any>;
  sort?: Record<string, any>;
  limit?: number;
}

export interface CollectionType {
  _id: string;
  disabled: boolean;
}

export interface FindOption {
  where?: Record<string, any>;
  sort?: Record<string, number>;
}

export interface PageOption {
  limit: 10 | 20 | 30 | 40 | 50;
  index: number;
}

export interface CollectionOption {
  key: string;
  storage: StorageMap;
}

export interface StorageOption {
  key: string;
  storage: StorageMap;
}
