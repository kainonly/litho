import { AdvancedType, AnyDto, BasicType, SchemaFieldOption, Filter } from '@weplanx/ng';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

export interface TableField {
  label: string;
  type: BasicType | AdvancedType;
  option?: Partial<SchemaFieldOption>;
  description?: string;
  keyword?: boolean;
}

export interface TableOption<T> {
  searchText: string;
  filter: Filter<T>;
  sort: Partial<{ [P in keyof AnyDto<T>]: -1 | 1 }>;
  size: number;
  index: number;
  columns: NzCheckBoxOptionInterface[];
  columnsWidth: Record<string, string>;
}

export interface Search {
  operator: string;
  value: any;
}
