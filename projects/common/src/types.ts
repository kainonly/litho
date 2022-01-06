import { QueryList, TemplateRef } from '@angular/core';

import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

export type Where<T> = Partial<{ [P in keyof AnyDto<T>]: any }>;
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
export interface CreateDto<T> {
  doc: T;
  format?: any;
  ref?: string[];
}
export interface CreateResult {
  InsertedID: string;
}
export interface UpdateDto<T> {
  update: Record<string, Partial<T & Record<string, any>>>;
  format?: any;
  ref?: string[];
}
export interface UpdateResult {
  MatchedCount: number;
  ModifiedCount: number;
  UpsertedCount: number;
  UpsertedID?: string;
}
export interface ReplaceDto<T> {
  doc: T;
  format?: any;
  ref?: string[];
}
export interface DeleteResult {
  DeletedCount: number;
}
export interface DatasetField {
  key: string;
  label: string;
  type: string;
  description?: string;
  keyword?: boolean;
}

export type PageSize = 10 | 20 | 30 | 40 | 50;

export interface DatasetOption {
  pageSize: PageSize;
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
  alert: TemplateRef<any>;
  /**
   * 操作区域
   */
  actions: QueryList<TemplateRef<any>>;
}

export interface Page {
  /**
   * 父节点
   */
  parent: string;
  /**
   * 显示名称
   */
  name: string;
  /**
   * 字体图标
   */
  icon?: string;
  /**
   * 种类
   */
  kind: string;
  /**
   * 数据源
   */
  schema?: Schema;

  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
}

export interface Schema {
  /**
   * 集合名称
   */
  key: string;
  /**
   * 字段设置
   */
  fields: Record<string, Field>;
  /**
   * 规则
   */
  rules?: any[];
  /**
   * 验证器
   */
  validator?: string;
}

export interface Field {
  /**
   * 显示名称
   */
  label: string;
  /**
   * 字段命名
   */
  key: string;
  /**
   * 字段类型
   */
  type: BasicType | AdvancedType;
  /**
   * 描述
   */
  description?: string;
  /**
   * 提示文字
   */
  placeholder?: string;
  /**
   * 默认值
   */
  default?: string;
  /**
   * 必填
   */
  required?: boolean;
  /**
   * 唯一
   */
  unique?: boolean;
  /**
   * 隐藏字段
   */
  hide?: boolean;
  /**
   * 可修改
   */
  modified?: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 扩展配置
   */
  option?: Partial<FieldOption>;
}

export type BasicType =
  | 'string' // 单行
  | 'text' // 多行
  | 'number' // 数字
  | 'datetime' // 日期时间
  | 'bool' // 状态
  | 'radio' // 单选
  | 'checkbox' // 复选
  | 'select'; // 选择器

export type AdvancedType =
  | 'richtext' // 富文本
  | 'picture' // 图片
  | 'video' // 视频
  | 'file' // 文件
  | 'json'; // 自定义

export interface FieldOption {
  /**
   * 最大值
   */
  max: number;
  /**
   * 最小值
   */
  min: number;
  /**
   * 保留小数
   */
  decimal: number;
  /**
   * 枚举
   */
  values: Value[];
  /**
   * 引用数据源
   */
  reference: string;
  /**
   * 引用目标
   */
  target: string;
  /**
   * 多选
   */
  multiple: boolean;
}

export interface Value {
  /**
   * 显示名称
   */
  label: string;
  /**
   * 数值
   */
  value: any;
}
