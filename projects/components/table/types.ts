import { Where } from '@weplanx/common';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzTableSize, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface TableField {
  key: string;
  label: string;
  type: string;
  description?: string;
  keyword?: boolean;
}

export interface TableOption {
  pageSize: number;
  pageIndex: number;
  searchText: string;
  searchOptions: Where<any>;
  sortOptions: Record<string, NzTableSortOrder>;
  columns: NzCheckBoxOptionInterface[];
  columnsHeight: NzTableSize;
  columnsWidth: Record<string, string>;
}
