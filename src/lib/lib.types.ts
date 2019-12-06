export interface I18nGroupOptions {
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

export interface I18nTooltipOptions {
  [key: string]: string[]
}

export interface SearchOptions {
  field: string;
  op: string;
  value: any;
  must?: boolean;
}

export interface Search {
  [field: string]: SearchOptions
}
