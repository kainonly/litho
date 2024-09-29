import { HttpContextToken, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export const EXTERNAL = new HttpContextToken<boolean>(() => false);
export type Any = any; // eslint-disable-line
export type R = Record<string, Any>;

export interface Search {
  q: string;
}

export interface SearchInput {
  text$: BehaviorSubject<string>;
  condition?: () => boolean;
  params?: (params: HttpParams) => HttpParams;
}

export interface BasicDto {
  id: string;
}

export interface FindOption {
  page: number;
  pagesize?: number;
  simple?: number;
}

export interface FindResult<T> {
  data: T[];
  total: number;
}

export interface SetUserDto {
  key: Omit<keyof SetUserDto, 'key'>;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export type UnsetUserKey = 'phone' | 'totp';
