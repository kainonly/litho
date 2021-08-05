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

export interface I18n {
  // 默认国际化 ID
  default: string;
  // 国际化设置
  languages: Language[];
}

export interface Language {
  id: string;
  name: string;
}

// export interface I18nOption {
//   i18n: string;
//   name: string;
// }
//
// export interface I18nGroupOption {
//   value: Record<string, any>;
//   validate: Record<string, ValidatorFn | ValidatorFn[] | AbstractControlOptions | null>;
//   asyncValidate: Record<string, AsyncValidatorFn | AsyncValidatorFn[] | null>;
// }

export interface SearchOption {
  field: string;
  op: string;
  value: any;
  exclude?: SearchExclude[];
  format?: SearchFormat;
}

export type SearchExclude = '' | 0 | null | any;
export type SearchFormat = 'unixtime';

export type OrderOption = Record<string, Order>;
export type Order = 'asc' | 'desc';

export interface ApiOption {
  baseUrl: string;
  model: string;
}

export interface ListsOption {
  id: string;
  query: SearchOption[];
  order?: OrderOption;
  limit?: number;
}
