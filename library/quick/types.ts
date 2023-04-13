import { AnyDto, WpxApi } from '@weplanx/ng';

export interface Quick {
  name: string;
}

export interface QuickFormData {
  api: WpxApi<Quick>;
  doc?: AnyDto<Quick>;
}
