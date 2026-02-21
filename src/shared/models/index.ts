export type Any = any; // eslint-disable-line
export type R = Record<string, Any>;

export interface Basic {
  id: string;
}

export interface SearchOption {
  q: string;
  filter?: Any;
}

export interface PageOption {
  page: number;
  pagesize?: number;
}

export interface Result<T> {
  data: T[];
  total: number;
}

export interface EnumType {
  label: string;
  value: number;
}

export * from './layout';
export * from './menu';
export * from './nav';
export * from './org';
export * from './cap';
export * from './resource';
export * from './role';
export * from './route';
export * from './user';
