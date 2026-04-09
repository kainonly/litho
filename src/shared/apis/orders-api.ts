import { Injectable } from '@angular/core';

import { Api } from './index';
import { Order } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class OrdersApi extends Api<Order> {
    override collection = 'orders';
}
