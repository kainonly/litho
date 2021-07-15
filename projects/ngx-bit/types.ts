import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { EmbeddedProperty } from 'ng-zorro-antd/grid';
import { NzI18nInterface } from 'ng-zorro-antd/i18n';

export type Upload = string | UploadOption;

export interface UploadOption {
  url: string;
  storage?: UploadStorage;
  fetchSigned?: string;
  fetchSignedMethod?: string;
  size?: number;
}

export type UploadStorage = 'default' | 'oss' | 'obs' | 'cos';

export type Grid = Record<string, Partial<GridOption>>;

export interface GridOption {
  nzFlex: string | number;
  nzSpan: string | number;
  nzOrder: string | number;
  nzOffset: string | number;
  nzPush: string | number;
  nzPull: string | number;
  nzXs: string | number | EmbeddedProperty;
  nzSm: string | number | EmbeddedProperty;
  nzMd: string | number | EmbeddedProperty;
  nzLg: string | number | EmbeddedProperty;
  nzXl: string | number | EmbeddedProperty;
  nzXXl: string | number | EmbeddedProperty;
}

export interface Locale {
  default: string;
  mapping: string[];
  bind: NzI18nInterface[];
}

export interface I18n {
  // 默认国际化 ID
  default: string;
  // 国际化包含语言 ID
  contain: string[];
  // 国际化设置
  switch: I18nOption[];
}

export interface I18nOption {
  i18n: string;
  name: Record<string, unknown>;
}

export type I18nTooltipOption = Record<string, string[]>;

export interface I18nGroupOption {
  value: Record<string, unknown>;
  validate: Record<string, ValidatorFn | ValidatorFn[] | AbstractControlOptions | null>;
  asyncValidate: Record<string, AsyncValidatorFn | AsyncValidatorFn[] | null>;
}

export interface SearchOption {
  field: string;
  op: string;
  value: unknown;
  exclude?: SearchExclude[];
  format?: SearchFormat;
}

export type SearchExclude = '' | 0 | null | unknown;
export type SearchFormat = 'unixtime';

export type OrderOption = Record<string, Order>;
export type Order = 'asc' | 'desc';

export interface ApiOption {
  baseUrl: string;
  model: string;
}

export interface ApiResponse {
  error: number;
  data: Record<string, unknown>;
  msg?: string;
}

export interface ListByPageOption {
  id: string;
  query: SearchOption[];
  order?: OrderOption;
  limit?: number;
}
