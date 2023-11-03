import { Any } from '@weplanx/ng';

export interface Builder {
  parent: string | null;
  name: string;
  kind: string;
  icon?: string;
  description?: string;
  schema?: BuilderSchema;
  status: boolean;
  sort: number;
}

export interface BuilderSchema {
  key: string;
  fields: Field[];
  rules?: Rule[];
}

export interface Field {
  name: string;
  key: string;
  type: keyof typeof FieldTypeDict;
  required: boolean;
  visible: boolean;
  default_to: Any;
  placeholder?: string;
  description?: string;
  option?: Partial<FieldOption>;
}

export interface FieldOption {
  max: number;
  min: number;
  decimal: number;
  time: boolean;
  enums: Enum[];
  ref: string;
  ref_keys: string[];
  component: string;
  multiple: boolean;
}

export interface Enum {
  label: string;
  value: Any;
}

export interface Rule {
  logic: string;
  conditions: RuleCondition[];
  keys: string[];
}

export interface RuleCondition {
  key: string;
  op: string;
  value: Any;
}

export const FieldTypeDict = {
  string: '单行文本',
  text: '多行文本',
  password: '密码',
  number: '数字',
  date: '日期',
  dates: '日期范围',
  bool: '开关',
  radio: '复选框',
  select: '选择器',
  richtext: '富文本',
  picture: '图片',
  video: '视频',
  file: '附件',
  ref: '引用',
  manual: '自定义'
};
