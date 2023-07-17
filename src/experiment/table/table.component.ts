import { Component, OnInit } from '@angular/core';

import { AnyDto } from '@weplanx/ng';
import { ColumnsType } from '@weplanx/ng/table';

import { OrdersService } from '../orders.service';
import { Order } from '../types';

@Component({
  selector: 'app-experiment-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  data: Array<AnyDto<Order>> = [];
  columns: ColumnsType<AnyDto<Order>>[] = [
    {
      title: '订单号',
      dataIndex: 'no'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '账户',
      dataIndex: 'account'
    }
  ];

  constructor(private orders: OrdersService) {}

  ngOnInit(): void {
    this.orders.find({}).subscribe(data => {
      this.data = [...data];
    });
  }
}
