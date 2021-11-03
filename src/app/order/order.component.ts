import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WpxService, WpxCollection } from '@weplanx/ngx';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  coll!: WpxCollection<any>;
  columns: NzCheckBoxOptionInterface[] = [
    { label: '订单号', value: 'order_number' },
    { label: '服务号', value: 'service_number' },
    { label: '服务名称', value: 'service_name' },
    { label: '服务描述', value: 'service_description' },
    { label: '服务码', value: 'service_code' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wpx: WpxService,
    private order: OrderService
  ) {}

  ngOnInit(): void {
    this.coll = this.wpx.collection('order', [
      { label: '订单号', value: 'order_number' },
      { label: '服务号', value: 'service_number' },
      { label: '服务名称', value: 'service_name' },
      { label: '服务描述', value: 'service_description' },
      { label: '服务码', value: 'service_code' }
    ]);
    this.coll.ready.subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false) {
    this.coll.from(this.order.api, refresh).subscribe(v => {});
  }
}
