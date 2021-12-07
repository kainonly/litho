import { FieldOption } from './field-option';

export interface Field {
  key: string;
  label: string;
  type: string;
  description: string;
  default: string;
  unique: boolean;
  required: boolean;
  hide: boolean;
  option: FieldOption;
}
