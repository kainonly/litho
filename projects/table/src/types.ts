import { AnyDto } from '@weplanx/ng';

export interface WpxColumns<T> {
  title: string;
  key: keyof AnyDto<T>;
}
