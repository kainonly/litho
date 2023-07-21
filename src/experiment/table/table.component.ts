import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Any, Filter, WpxModel, WpxService } from '@weplanx/ng';
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
  filter: Filter<Order> = {};

  constructor(
    private wpx: WpxService,
    private fb: FormBuilder,
    public orders: OrdersService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      no: [],
      name: [],
      account: []
    });
    this.model = this.wpx.setModel<Order>('exp', this.orders);
    this.model.ready().subscribe(() => {
      this.getData();
    });
  }

  getData(): void {
    this.model.fetch(this.filter).subscribe(() => {
      // console.log('ok');
    });
  }

  search(data: Any): void {
    for (const [k, v] of Object.entries(data)) {
      if (v) {
        this.filter[k] = { $regex: `${v}`, $options: 'i' };
      }
    }
    this.getData();
  }
}
