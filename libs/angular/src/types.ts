import { ComponentPortal } from '@angular/cdk/portal';
import { UntypedFormGroup } from '@angular/forms';

import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

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

/**
 * 低码类型
 */
export type PageKind = 'default' | 'aggregation' | 'manual' | 'group';
export type PageManifest = 'default' | 'form' | 'dashboard';
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
  kind: PageKind;
  /**
   * 形式
   */
  manifest?: PageManifest;
  /**
   * 模型架构，数据集是存在
   */
  schema?: Schema;
  /**
   * 数据源，数据聚合是存在
   */
  source?: Source;
  /**
   * 自定义，自定义种类时存在
   */
  manual?: Manual;
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
}

export type Nav = Pick<Page, 'parent' | 'name' | 'icon' | 'kind' | 'sort'> & {
  _id: string;
  children?: Nav[];
  parentNode?: Nav;
};

export interface Schema {
  /**
   * 命名
   */
  key: string;
  /**
   * 字段
   */
  fields: SchemaField[];
  /**
   * 显隐规则
   */
  rules?: SchemaRule[];
  /**
   * 启用事务补偿
   */
  event?: boolean;
  /**
   * 启用详情查看
   */
  detail?: boolean;
}

export type BasicType =
  | 'string' // 单行
  | 'text' // 多行
  | 'number' // 数字
  | 'date' // 日期
  | 'dates' // 日期范围
  | 'bool' // 状态
  | 'radio' // 单选
  | 'checkbox' // 复选
  | 'select'; // 选择器

export type ComplexType =
  | 'ref' // 引用
  | 'richtext' // 富文本
  | 'picture' // 图片
  | 'video' // 视频
  | 'file' // 文件
  | 'manual'; // 自定义

export interface SchemaField {
  /**
   * 命名
   */
  key: string;
  /**
   * 显示名称
   */
  label: string;
  /**
   * 字段类型
   */
  type: BasicType | ComplexType;
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
  default?: any;
  /**
   * 关键词
   */
  keyword?: boolean;
  /**
   * 必填
   */
  required: boolean;
  /**
   * 隐藏字段
   */
  hide: boolean;
  /**
   * 只读
   */
  readonly: boolean;
  /**
   * 投影
   */
  projection: number;
  /**
   * 排序
   */
  sort: number;
  /**
   * 扩展配置
   */
  option?: Partial<SchemaFieldOption>;
}

export interface SchemaFieldOption {
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
   * 包含时间
   */
  time: boolean;
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
  /**
   * 组件标识
   */
  component: string;
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

export interface SchemaRule {
  /**
   * 逻辑
   */
  logic: 'and' | 'or';
  /**
   * 条件
   */
  conditions: SchemaRuleCondition[];
  /**
   * 显示字段
   */
  keys: string[];
}

export interface SchemaRuleCondition {
  /**
   * 字段
   */
  key: string;
  /**
   * 操作
   */
  operate: 'eq' | 'ne' | 'in' | 'nin';
  /**
   * 数值
   */
  value: any;
}

export interface Source {
  /**
   * 布局
   */
  layout?: any;
  /**
   * 图表
   */
  panels: Panel[];
}

export interface Panel {
  /**
   * 模式
   */
  query: 'default' | 'flux';
  /**
   * 映射
   */
  mappings: Record<string, string>;
  /**
   * 样式
   */
  style: any;
}

export interface Manual {
  /**
   * 页面标识，自定义页面接入命名
   */
  scope: string;
  /**
   * 权限细粒化
   */
  policies: Record<string, any>;
}

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

export interface WpxFormInitOption {
  form: UntypedFormGroup;
  format: Record<string, XData>;
}

export interface Media {
  /**
   * 媒体名称
   */
  name: string;
  /**
   * 媒体URL
   */
  url: string;
  /**
   * 数据参数
   */
  params?: Record<string, string>;
  /**
   * 标记
   */
  labels?: string[];
}

export type MediaType = 'pictures' | 'videos';

export type ResolveDone = (data: ResolveData) => void;

export interface ResolveData {
  assets: string;
  url: string;
}

export interface Config {
  resolve: (done: ResolveDone) => void;
  change: () => void;
}

export interface TableField {
  label: string;
  type: BasicType | ComplexType;
  option?: Partial<SchemaFieldOption>;
  description?: string;
  keyword?: boolean;
}

export interface TableOption<T> {
  searchText: string;
  filter: Filter<T>;
  sort: Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
  pagesize: number;
  page: number;
  columns: NzCheckBoxOptionInterface[];
  columnsWidth: Record<string, string>;
}

export interface Search {
  operator: string;
  value: any;
}

import { NzUploadFile } from 'ng-zorro-antd/upload';

export interface Transport {
  name: string;
  percent: number;
  file: NzUploadFile;
}
