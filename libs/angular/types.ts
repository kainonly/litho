import { ComponentPortal } from '@angular/cdk/portal';

import { Page } from '@weplanx/common';

export type R = Record<string, any>;
export interface BasicDto extends R {
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
}
export type AnyDto<T> = T & BasicDto;

export type Filter<T> = Partial<{ [P in keyof AnyDto<T>]: any }>;
export type Keys<T> = Partial<{ [P in keyof AnyDto<T>]: 0 | 1 }>;
export type Sort<T> = Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
export type XFilter = 'oid' | 'oids' | 'date';
export type XData = 'oid' | 'oids' | 'password';
export interface ApiOptions<T> {
  /**
   * 映射字段
   */
  keys?: Keys<T>;
  /**
   * 排序规则
   */
  sort?: Sort<T>;
  /**
   * 页码
   */
  page?: number;
  /**
   * 分页大小
   */
  pagesize?: number;
  /**
   * 筛选转换
   */
  xfilter?: Record<string, XFilter>;
  /**
   * 数据转换
   */
  xdata?: Record<string, XData>;
  /**
   * 数组过滤
   */
  array_filters?: any[];
}

export type FilterOption<T> = Pick<ApiOptions<T>, 'xfilter'>;
export type CreateOption<T> = Pick<ApiOptions<T>, 'xdata'>;
export type FindOneOption<T> = Pick<ApiOptions<T>, 'keys' | 'xfilter'>;
export type FindByIdOption<T> = Pick<ApiOptions<T>, 'keys'>;
export type FindOption<T> = Omit<ApiOptions<T>, 'xdata' | 'array_filters'>;
export type UpdateOption<T> = Pick<ApiOptions<T>, 'xfilter' | 'xdata' | 'array_filters'>;
export type UpdateOneByIdOption<T> = Pick<ApiOptions<T>, 'xdata' | 'array_filters'>;

export type Nav = Pick<Page, 'parent' | 'name' | 'icon' | 'kind' | 'sort'> & {
  _id: string;
  children?: Nav[];
  parentNode?: Nav;
};

export interface ComponentTypeOption<T> {
  /**
   * 名称
   */
  name: string;
  /**
   * 组件
   */
  component: ComponentPortal<T>;
}

/**
 * 用户信息
 */
export interface UserInfo {
  username: string;
  email: string;
  name: string;
  avatar: string;
  roles?: string[];
  department?: string;
  feishu?: any;
  sessions: number;
  last: string;
  create_time: number;
}

export interface UploadOption {
  type: 'cos';
  url: string;
  limit: number;
}

export interface ImageInfoDto {
  format: string;
  height: number;
  width: number;
  size: number;
}
