import { Injectable } from '@angular/core';

import { Api } from '@weplanx/common';

import { Order } from './order';

@Injectable()
export class OrdersService extends Api<Order> {
  protected override model = 'ex_orders';
}
