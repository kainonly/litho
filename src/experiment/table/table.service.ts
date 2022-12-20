import { Injectable } from '@angular/core';

import { WpxApi } from '@weplanx/ng';

import { Order } from './types';

@Injectable()
export class TableService extends WpxApi<Order> {
  protected override collection = 'dev_table';
}
