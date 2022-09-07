import { ObjectId } from 'mongodb';

export interface Page {
  /**
   * 父节点
   */
  parent?: ObjectId;
  /**
   * 名称
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
   * 形式
   */
  manifest: string;
  /**
   * 模型
   */
  schema?: PageSchema;
  /**
   * 数据源
   */
  source?: PageSource;
  /**
   * 自定义
   */
  manual?: PageManual;
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
  /**
   * 创建时间
   */
  create_time: Date;
  /**
   * 更新时间
   */
  update_time: Date;
}

export interface PageSchema {
  /**
   * 命名
   */
  key: string;
  /**
   * 字段
   */
  fields: SchemaFeild[];
  /**
   * 显隐规则
   */
  rules: SchemaRule[];
  /**
   * 启用事务补偿
   */
  event: boolean;
  /**
   * 启用详情
   */
  detail: boolean;
}

export interface SchemaFeild {
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
  type: string;
  /**
   * 字段描述
   */
  description: string;
  /**
   * 字段提示
   */
  placeholder: string;
  /**
   * 默认值
   */
  default: any;
  /**
   * 关键词
   */
  keyword: boolean;
  /**
   * 是否必须
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
   * 配置
   */
  option: SchemaFieldOption;
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
  values: Enum[];
  /**
   * 引用模型
   */
  reference: string;
  /**
   * 目标字段
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

export interface Enum {
  /**
   * 名称
   */
  label: string;
  /**
   * 数值
   */
  value: string;
}

export interface SchemaRule {
  /**
   * 逻辑
   */
  logic: string;
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
   * 操作符
   */
  operate: string;
  /**
   * 数值
   */
  value: any;
}

export interface PageSource {
  /**
   * 布局
   */
  layout: string;
  /**
   * 图表
   */
  panels: Panel[];
}

export interface Panel {
  /**
   * 模式
   */
  query: string;
  /**
   * 映射
   */
  mappings: Record<string, string>;
  /**
   * 样式
   */
  style: Record<string, any>;
}

export interface PageManual {
  /**
   * 页面标识
   */
  scope: string;
  /**
   * 权限细粒化
   */
  policies: Record<string, string>;
}
