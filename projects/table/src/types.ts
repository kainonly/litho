import { AnyDto } from '@weplanx/ng';

export type WpxColumn<T> = Omit<WpxTableColumn<T>, 'display'>;

export interface WpxTableColumn<T> {
  title: string;
  key: keyof AnyDto<T>;
  display: boolean;
  width?: string;
  ellipsis?: boolean;
}
