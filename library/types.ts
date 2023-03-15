import { ComponentPortal } from '@angular/cdk/portal';

export type AnyDto<T> = T & BasicDto;
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

export type Filter<T> = Partial<{ [P in keyof AnyDto<T>]: any }>;
export type Sort<T> = Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
export type XFilter = 'oid' | 'oids' | 'date';
export type XData = 'oid' | 'oids' | 'date' | 'password';

export interface ApiOptions<T> {
  keys?: Array<keyof AnyDto<T>>;
  sort?: Map<keyof AnyDto<T>, -1 | 1>;
  page?: number;
  pagesize?: number;
  xfilter?: Record<string, XFilter>;
  xdata?: Record<string, XData>;
  txn?: string;
}

export type FilterOption<T> = Pick<ApiOptions<T>, 'xfilter'>;
export type CreateOption<T> = Pick<ApiOptions<T>, 'xdata' | 'txn'>;
export type FindOption<T> = Omit<ApiOptions<T>, 'xdata' | 'txn'>;
export type FindOneOption<T> = Pick<ApiOptions<T>, 'keys' | 'xfilter'>;
export type FindByIdOption<T> = Pick<ApiOptions<T>, 'keys'>;
export type UpdateOption<T> = Pick<ApiOptions<T>, 'xfilter' | 'xdata' | 'txn'>;
export type UpdateOneByIdOption<T> = Pick<ApiOptions<T>, 'xdata' | 'txn'>;
export type ReplaceOption<T> = Pick<ApiOptions<T>, 'xdata' | 'txn'>;
export type DeleteOption<T> = Pick<ApiOptions<T>, 'txn'>;
export type BulkDeleteOption<T> = Pick<ApiOptions<T>, 'xfilter' | 'txn'>;
export type SortOption<T> = Pick<ApiOptions<T>, 'txn'>;

export interface TransactionResult {
  txn: string;
}

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
  | 'datetime' // 时间与日期
  | 'datetimes' // 时间与日期范围
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

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
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

export interface LoadOption {
  url: string;
  plugins: string[];
}
