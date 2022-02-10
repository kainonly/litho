import { Injectable } from '@angular/core';

import { Api } from '@weplanx/common';

import { Types } from './types';

@Injectable()
export class OrdersService extends Api<Types> {
  protected override model = 'orders_example';
}
