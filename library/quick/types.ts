import { AnyDto, WpxApi } from '@weplanx/ng';

export interface WpxQuick {
  name: string;
}

export interface WpxQuickFormData {
  api: WpxApi<WpxQuick>;
  doc?: AnyDto<WpxQuick>;
}
