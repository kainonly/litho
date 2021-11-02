import { Injectable } from '@angular/core';

import { WpxApi, WpxService } from '@weplanx/ngx';

@Injectable()
export class WpxPageSerivce {
  api!: WpxApi;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('page');
  }
}
