import { Component, OnInit } from '@angular/core';

import { Collection, WpxService } from '@weplanx/components';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  coll!: Collection<any>;

  constructor(private wpx: WpxService, private order: OrderService) {}

  ngOnInit(): void {
    this.coll = this.wpx.collection('order', [
      { label: '订单号', key: 'order_number', type: 'text', keyword: true },
      { label: '服务号', key: 'service_number', type: 'text', keyword: true },
      { label: '服务名称', key: 'service_name', type: 'text' },
      { label: '服务描述', key: 'service_description', type: 'text' },
      { label: '服务码', key: 'service_code', type: 'text' }
    ]);
    this.coll.ready.subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false) {
    this.coll.from(this.order.api, refresh).subscribe(v => {});
  }
}
