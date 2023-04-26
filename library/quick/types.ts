import { AnyDto, WpxApi } from '@weplanx/ng';

export interface WpxQuick {
  name: string;
}

export interface WpxQuickInputData {
  api: WpxApi<WpxQuick>;
  doc?: AnyDto<WpxQuick>;
}
