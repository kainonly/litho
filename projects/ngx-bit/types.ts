import { EmbeddedProperty } from 'ng-zorro-antd/grid';

export type Upload = string | UploadOption;
export type UploadOption = {
  url: string;
  storage?: UploadStorage;
  fetchSigned?: string;
  fetchSignedMethod?: string;
  size?: number;
};
export type UploadStorage = 'default' | 'oss' | 'obs' | 'cos';

export type Grid = Record<string, GridOption>;
export type GridOption = {
  nzFlex?: string | number;
  nzSpan?: string | number;
  nzOrder?: string | number;
  nzOffset?: string | number;
  nzPush?: string | number;
  nzPull?: string | number;
  nzXs?: string | number | EmbeddedProperty;
  nzSm?: string | number | EmbeddedProperty;
  nzMd?: string | number | EmbeddedProperty;
  nzLg?: string | number | EmbeddedProperty;
  nzXl?: string | number | EmbeddedProperty;
  nzXXl?: string | number | EmbeddedProperty;
};

export type Locale = {
  default: string;
  mapping: string[];
  bind: any[];
};

export type I18n = {
  // 默认国际化 ID
  default: string;
  // 国际化包含语言 ID
  contain: string[];
  // 国际化设置
  switch: I18nOption[];
};
export type I18nOption = {
  i18n: string;
  name: Record<string, any>;
};
export type I18nTooltipOption = Record<string, string[]>;
export type I18nGroupOption = {
  value?: any;
  validate?: any;
  asyncValidate?: any;
};

export interface SearchOption {
  field: string;
  op: string;
  value: any;
  exclude?: any[];
  format?: string;
}

export type OrderOption = Record<string, Order>;
export type Order = 'asc' | 'desc';

export type ApiOption = {
  baseUrl: string;
  model: string;
};

export type ListByPageOption = {
  id: string;
  query: SearchOption[];
  order?: OrderOption;
  limit?: number;
};
export type ListsOption = {
  refresh: boolean;
  persistence: boolean;
};
