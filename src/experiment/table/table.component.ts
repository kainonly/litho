import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Any, WpxModel, WpxService } from '@weplanx/ng';
import { WpxColumns } from '@weplanx/table';

import { OrdersService } from '../orders.service';
import { Order } from '../types';

@Component({
  selector: 'app-exp-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
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
  model!: WpxModel<Order>;
  form!: FormGroup;

  constructor(
    private wpx: WpxService,
    private fb: FormBuilder,
    public orders: OrdersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      no: []
    });
    this.model = this.wpx.setModel<Order>('exp', this.orders);
    this.model.ready().subscribe(() => {
      this.getData();
    });
  }

  getData(): void {
    this.model.fetch().subscribe(() => {
      // console.log(data);
    });
  }

  search(data: Any): void {
    console.log(data);
  }
}
