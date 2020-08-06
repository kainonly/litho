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

export interface I18nOption {
  i18n: string;
  name: object;
}

export interface I18nTooltipOption {
  [key: string]: string[]
}

export interface AlertCustomize {
  text?: string;
  errorText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface I18nGroupOption {
  value?: any;
  validate?: any;
  asyncValidate?: any;
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
}

export interface ListByPageOption {
  id: string;
  limit?: number;
  query: SearchOption[]
}

export interface SearchOption {
  field: string;
  op: string;
  value: any;
  must?: boolean;
}

