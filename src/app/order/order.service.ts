import { Injectable } from '@angular/core';

import { Api, WpxService } from '@weplanx/components';

@Injectable()
export class OrderService {
  api!: Api;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('order');
  }
}
