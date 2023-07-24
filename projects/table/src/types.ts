import { TemplateRef } from '@angular/core';

import { Any, AnyDto } from '@weplanx/ng';

export type WpxColumns<T> = Omit<WpxTableColumns<T>, 'display'>;

export interface WpxTableColumns<T> {
  title: string;
  key: keyof AnyDto<T>;
  display: boolean;
  width?: string;
  ellipsis?: boolean;
  render?: TemplateRef<Any>;
}
