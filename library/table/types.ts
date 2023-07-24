import { TemplateRef } from '@angular/core';

import { Any, AnyDto } from '@weplanx/ng';

export type Column<T> = {
  title: string;
  key: keyof AnyDto<T>;
  render?: TemplateRef<Any>;
  width?: string;
  display?: boolean;
  ellipsis?: boolean;
  sort?: number;
};

export type Preferences<T> = Pick<Column<T>, 'display' | 'width' | 'sort'>;
export type WpxColumn<T> = Omit<Column<T>, 'display' | 'sort'>;
