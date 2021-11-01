import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WpxService, WpxCollection, DataLists } from '@weplanx/ngx';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  coll!: WpxCollection<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wpx: WpxService,
    private order: OrderService
  ) {}

  ngOnInit(): void {
    this.coll = this.wpx.collection('order');
    this.coll.ready.subscribe(() => {
      this.getOrders(true);
    });
  }

  getOrders(refresh = false) {
    this.order.api.page(this.coll, refresh).subscribe(v => {
      const data = v as DataLists<any>;
      this.coll.setData(data.lists, data.total);
      this.coll.updateStorageValue();
    });
  }
}
