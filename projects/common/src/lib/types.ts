import { QueryList, TemplateRef } from '@angular/core';

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
  doc?: T;
  docs?: T[];
  format?: any;
  ref?: string[];
}

export type Where<T> = Partial<{ [P in keyof T]: any }> | { [k: string]: any };

export interface UpdateDto<T> {
  update: Record<string, Partial<T & Record<string, any>>>;
  format?: any;
  ref?: string[];
}

export interface ReplaceDto<T> {
  doc: T;
  format?: any;
  ref?: string[];
}

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

export interface AssetsOption {
  params?: Record<string, string>;
  css?: boolean;
}

export interface LayoutOption {
  /**
   * 无留白
   */
  noPadding: boolean;
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
   * 页头内容
   */
  content: TemplateRef<any>;
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
