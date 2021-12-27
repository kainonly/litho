import { QueryList, TemplateRef } from '@angular/core';

import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

export interface BasicDto {
  /**
   * 对象 ID
   */
  _id: string;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 修改时间
   */
  update_time: Date;
  /**
   * 扩展字段
   */
  [key: string]: any;
}
export type AnyDto<T> = T & BasicDto;
export type Where<T> = Partial<{ [P in keyof AnyDto<T>]: any }>;
export interface CreateResult {
  InsertedID: string;
}
export interface UpdateDto<T> {
  update: Record<string, Partial<T>>;
}
export interface UpdateResult {
  MatchedCount: number;
  ModifiedCount: number;
  UpsertedCount: number;
  UpsertedID?: string;
}
export interface DeleteResult {
  DeletedCount: number;
}

export interface Field {
  key: string;
  label: string;
  type: string;
  description?: string;
  keyword?: boolean;
}
export interface DatasetControl {
  pageSize: 10 | 20 | 30 | 40 | 50;
  pageIndex: number;
  columns: NzCheckBoxOptionInterface[];
  columnsHeight: NzTableSize;
  columnsWidth: Record<string, string>;
  searchText: string;
  searchOptions: Record<string, SearchOption>;
  sortOptions: Record<string, NzTableSortOrder>;
}
export interface SearchOption {
  operator: string;
  value: any;
}

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

export interface LayoutOption {
  /**
   * 是否忽略页头
   */
  skipPageHeader: boolean;
  /**
   * 是否显示返回
   */
  showBack: boolean;
  /**
   * 标题
   */
  title: string;
  /**
   * 全局提示区域
   */
  alert: TemplateRef<unknown>;
  /**
   * 操作区域
   */
  actions: QueryList<TemplateRef<unknown>>;
}
