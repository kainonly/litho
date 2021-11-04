import { Field } from '@weplanx/ngx';

export interface Schema {
  _id: string;
  key: string;
  label: string;
  kind: SchemaKind;
  system?: boolean;
  fields?: SchemaField[];
}

export type SchemaKind = 'collection' | 'single' | 'manual';

export interface SchemaField extends Field {
  default: string;
  required: boolean;
  unique: boolean;
  private: boolean;
  system: boolean;
  option?: Partial<SchemaFieldOption>;
}

export interface SchemaFieldOption {
  max: number;
  min: number;
  mode: string;
  target: string;
  to: string;
}
