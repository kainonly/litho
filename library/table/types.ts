import { TemplateRef } from '@angular/core';

import { Any, AnyDto } from '@weplanx/ng';

export type Scroll = { x?: string; y: string };
export type Column<T> = {
  title: string;
  key: keyof AnyDto<T>;
  render?: TemplateRef<Any>;
  width?: string;
  display?: boolean;
  ellipsis?: boolean;
  sort?: number;
  format?: ColumnFormat;
};
export type ColumnFormat = 'status' | 'date';
export type Preferences<T> = Pick<Column<T>, 'display' | 'width' | 'sort'>;
export type WpxColumn<T> = Omit<Column<T>, 'display' | 'sort'>;
