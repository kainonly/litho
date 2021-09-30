import { Injectable } from '@angular/core';

import { WpxService, WpxApi } from '@weplanx/ngx';

@Injectable()
export class PageService {
  api!: WpxApi;

  constructor(private wpx: WpxService) {
    this.api = wpx.createApi('page');
  }
}
