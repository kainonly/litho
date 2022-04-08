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
   * 私有属性
   */
  _disabled?: boolean;
}

export type R = Record<string, any>;
export type AnyDto<T> = T & Omit<BasicDto, '_disabled'>;

export interface ApiOptions<T> {
  /**
   * 映射字段
   */
  field?: Array<keyof AnyDto<T>>;
  /**
   * 排序规则
   */
  sort?: Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
  /**
   * 限定数量
   */
  limit?: number;
  /**
   * 跳过数量
   */
  skip?: number;
  /**
   * 筛选转换
   */
  format_filter?: Record<string, FormatFilter>;
  /**
   * 文档转换
   */
  format_doc?: Record<string, FormatDoc>;
}

export type FormatFilter = 'oid' | 'oids';
export type FormatDoc = 'oid' | 'oids' | 'password';
export type Filter<T> = Partial<{ [P in keyof T | string]: any }>;
export type FilterOption<T> = Pick<ApiOptions<T>, 'format_filter'>;
export type CreateOption<T> = Pick<ApiOptions<T>, 'format_doc'>;
export type FindOneOption<T> = Pick<ApiOptions<T>, 'field' | 'format_filter'>;
export type FindOneByIdOption<T> = Pick<ApiOptions<T>, 'field'>;
export type FindOption<T> = Omit<ApiOptions<T>, 'format_doc'>;
export type UpdateOption<T> = Pick<ApiOptions<T>, 'format_filter' | 'format_doc'>;
export type UpdateOneByIdOption<T> = Pick<ApiOptions<T>, 'format_doc'>;

export interface UploadOption {
  /**
   * 本地上传路径或对象存储路径
   */
  url?: string;
  /**
   * 用于获取对象存储上传签名参数的请求地址
   */
  presignedUrl?: string;
  /**
   * 限制上传大小
   */
  size?: number;
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
  /**
   * 私有属性
   */
  _children?: Page[];
  _path?: string[];
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
  | 'date' // 日期
  | 'between-dates' // 日期之间
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
