import { FieldOption } from './field-option';

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
