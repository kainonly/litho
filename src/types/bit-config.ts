import { I18nOption } from './i18n-option';

export interface BitConfig {
  url: {
    api: string,
    static: string,
    icon?: string
  };
  api: {
    namespace: string,
    upload: string,
    withCredentials: boolean
  };
  col: {
    [key: string]: any
  };
  locale: {
    default: string,
    mapping: Map<number, string>
    bind: Map<string, any>
  };
  i18n: {
    default: string,
    contain: string[],
    switch: I18nOption[]
  };
  page: number;
}



