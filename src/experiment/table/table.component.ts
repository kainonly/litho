import { Component, OnInit } from '@angular/core';

import { AnyDto, WpxModel } from '@weplanx/ng';
import { WpxColumns, TableQuery } from '@weplanx/table';

import { OrdersService } from '../orders.service';
import { Order } from '../types';

@Component({
  selector: 'app-exp-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  data: Array<AnyDto<Order>> = [];
  columns: WpxColumns<AnyDto<Order>>[] = [
    {
      title: '订单号',
      key: 'no'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '账户',
      key: 'account'
    }
  ];
  model: WpxModel<AnyDto<Order>> = new WpxModel();

  constructor(public orders: OrdersService) {}

  ngOnInit(): void {}

  getData(query: TableQuery): void {
    this.orders.find({}, { page: query.index, pagesize: 100 }).subscribe(({ data }) => {
      this.data = [...this.data, ...data];
    });
  }
}
