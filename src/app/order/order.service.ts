import { Injectable } from '@angular/core';

import { WpxApi, WpxService } from '@weplanx/ngx';

@Injectable()
export class OrderService {
  api!: WpxApi;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('order');
  }
}
