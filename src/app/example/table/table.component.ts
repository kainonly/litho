import { Component } from '@angular/core';

import { TableField } from '@weplanx/components/table';

import { OrdersService } from './orders.service';

@Component({
  selector: 'app-example-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  key = 'orders_example';
  fields: Map<string, TableField> = new Map<string, TableField>([
    ['order_number', { label: '订单号', type: 'text', keyword: true }],
    ['service_number', { label: '服务号', type: 'text', keyword: true }],
    ['service_name', { label: '服务名称', type: 'text' }],
    ['service_description', { label: '服务描述', type: 'text' }],
    ['service_code', { label: '服务码', type: 'text' }]
  ]);

  constructor(public orders: OrdersService) {}
}
