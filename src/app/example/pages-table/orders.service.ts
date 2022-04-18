import { Injectable } from '@angular/core';

import { Api } from '@weplanx/common';

import { Order } from './types';

@Injectable()
export class OrdersService extends Api<Order> {
  protected override model = 'xorders';
}
