import { Component } from '@angular/core';

import { TableField } from '@weplanx/components/table';

import { OrdersService } from './orders.service';

@Component({
  selector: 'app-example-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  fields: TableField[] = [
    { label: '订单号', key: 'order_number', type: 'text', keyword: true },
    { label: '服务号', key: 'service_number', type: 'text', keyword: true },
    { label: '服务名称', key: 'service_name', type: 'text' },
    { label: '服务描述', key: 'service_description', type: 'text' },
    { label: '服务码', key: 'service_code', type: 'text' }
  ];

  constructor(public orders: OrdersService) {}
}
