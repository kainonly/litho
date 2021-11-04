import { HttpClient } from '@angular/common/http';
import { QueryList, TemplateRef } from '@angular/core';

import { StorageMap } from '@ngx-pwa/local-storage';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

export interface APIOption {
  http: HttpClient;
  baseUrl: string;
  model: string;
}

export interface APIResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface PageData<T> {
  value: T[];
  total: number;
}

export interface Field {
  key: string;
  label: string;
  type: string;
  description?: string;
  keyword?: boolean;
}

export interface CollectionOption {
  key: string;
  storage: StorageMap;
  fields: Field[];
}

export interface CollectionValue {
  _id: string;
  disabled?: boolean;
}

export interface CollectionStorageValue {
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
  value: unknown;
}

export interface SearchValue {
  [operator: string]: unknown;
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

export interface Page {
  /**
   * 主键
   */
  _id: string;
  /**
   * 父节点
   */
  parent: string;
  /**
   * URL片段
   */
  fragment: string;
  /**
   * URL片段组
   */
  fragments: string[];
  /**
   * 层级
   */
  level: number;
  /**
   * 节点名称
   */
  name: string;
  /**
   * 是否为导航
   */
  nav: boolean;
  /**
   * 字体图标
   */
  icon: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 是否为路由
   */
  router?: 'manual' | 'table' | 'form';
  /**
   * 页面设置
   */
  option?: PageOption;
  /**
   * 子集
   */
  children: Page[];
  /**
   * 扩展定义
   */
  [key: string]: any;
}

export interface PageOption {
  /**
   * 引用内容类型
   */
  schema: string;
  /**
   * 是否预加载
   */
  fetch: boolean;
  /**
   * 视图字段
   */
  fields: ViewField[];
  /**
   * JSON Schema 验证
   */
  validation: unknown;
}

export interface ViewField {
  /**
   * 字段名
   */
  key: string;
  /**
   * 显示名称
   */
  label: string;
  /**
   * 是否显示
   */
  display: boolean;
}
