import { Any, AnyDto } from '@weplanx/ng';

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

export type BuilderNode = AnyDto<Builder> & {
  disabled?: boolean;
  children?: BuilderNode[];
};

export interface BuilderSchema {
  key: string;
  fields: Field[];
  rules?: Rule[];
}

export interface Field {
  name: string;
  key: string;
  type: string;
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
