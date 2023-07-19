import { Component, OnInit } from '@angular/core';

import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { WpxColumns } from '@weplanx/table';

import { OrdersService } from '../orders.service';
import { Order } from '../types';

@Component({
  selector: 'app-exp-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  model!: WpxModel<AnyDto<Order>>;
  columns: WpxColumns<Order>[] = [
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

  constructor(
    private wpx: WpxService,
    public orders: OrdersService
  ) {
    this.model = wpx.setModel<Order>('exp');
  }

  ngOnInit(): void {
    this.model.ready().subscribe(() => {
      this.getData();
    });
  }

  getData(): void {
    this.orders.find({}, { ...this.model.options }).subscribe(v => {
      this.model.set(v);
    });
  }
}
