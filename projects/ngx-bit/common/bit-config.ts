import { Injectable } from '@angular/core';
import { CurdOption, I18nOption, UploadStorage } from './types';

@Injectable({ providedIn: 'root' })
export class BitConfig {
  url!: {
    api: string;
    static: string;
    icon?: string;
  };
  api!: {
    namespace: string;
    withCredentials: boolean;
    upload: string;
    uploadStorage?: UploadStorage;
    uploadFetchSigned?: string;
    uploadFetchSignedMethod?: string;
    uploadSize?: number;
  };
  curd!: CurdOption;
  col!: Record<string, unknown>;
  locale!: {
    default: string;
    mapping: string[];
    bind: any[];
  };
  i18n!: {
    default: string;
    contain: string[];
    switch: I18nOption[];
  };
  page!: number;
  query!: 'sql-orm' | 'mongo' | 'cloud';
}
