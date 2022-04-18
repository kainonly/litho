import { Component } from '@angular/core';

import { AnyDto, Data } from '@weplanx/ng';
import { TableField } from '@weplanx/ng/table';

import { OrdersService } from './orders.service';
import { Order } from './types';

@Component({
  selector: 'app-example-pages-table',
  templateUrl: './pages-table.component.html'
})
export class PagesTableComponent {
  key = 'xorders';
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['order_number', { label: '订单号', type: 'text', keyword: true }],
    ['service_number', { label: '服务号', type: 'text', keyword: true }],
    ['service_name', { label: '服务名称', type: 'text' }],
    ['service_description', { label: '服务描述', type: 'text' }],
    ['service_code', { label: '服务码', type: 'text' }]
  ]);
  data: Data<AnyDto<Order>> = new Data<AnyDto<Order>>();

  constructor(public orders: OrdersService) {}
}
