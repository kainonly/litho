import { AdvancedType, BasicType, Where } from '@weplanx/common';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface TableField {
  label: string;
  type: string;
  description?: string;
  keyword?: boolean;
}

export interface TableOption {
  pageSize: number;
  pageIndex: number;
  searchText: string;
  where: Where<any>;
  sort: Record<string, NzTableSortOrder>;
  columns: NzCheckBoxOptionInterface[];
  columnsWidth: Record<string, string>;
}

export interface Search {
  operator: string;
  value: any;
}
