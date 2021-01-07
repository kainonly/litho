export interface UrlConfig {
  api: string;
  static: string;
  icon?: string;
}

export type UploadStorage = 'default' | 'oss' | 'obs' | 'cos';

export interface ApiConfig {
  namespace: string;
  withCredentials: boolean;
  upload: string;
  uploadStorage?: UploadStorage;
  uploadFetchSigned?: string;
  uploadFetchSignedMethod?: string;
  uploadSize?: number;
}

export interface CurdConfig {
  get: string;
  lists: string;
  originLists: string;
  add: string;
  edit: string;
  status: string;
  delete: string;
}

export interface ColConfig {
  [key: string]: any;
}

export interface LocaleConfig {
  default: string;
  mapping: Map<number, string>;
  bind: Map<string, any>;
}

export interface I18nOption {
  i18n: string;
  name: object;
}

export interface I18nConfig {
  default: string;
  contain: string[];
  switch: I18nOption[];
}

export interface BitConfig {
  url: UrlConfig;
  api: ApiConfig;
  curd: CurdConfig;
  col: ColConfig;
  locale: LocaleConfig;
  i18n: I18nConfig;
  page: number;
}

export interface ListsOption {
  refresh: boolean;
  persistence: boolean;
}

export interface SearchOption {
  field: string;
  op: string;
  value: any;
  must?: boolean;
  // TODO: exclude value
}

export interface OrderOption {
  [field: string]: 'asc' | 'desc';
}

export interface ListByPageOption {
  id: string;
  limit?: number;
  query: SearchOption[];
  order?: OrderOption;
}

export interface BreadcrumbOption {
  name: any;
  key: string;
  router: number;
}

export type I18nTooltipOption = {
  [key: string]: string[];
} | {};

export interface I18nGroupOption {
  value?: any;
  validate?: any;
  asyncValidate?: any;
}

export interface AlertCustomize {
  text?: string;
  errorText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}
