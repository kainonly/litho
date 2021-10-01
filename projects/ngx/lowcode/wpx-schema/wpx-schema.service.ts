import { Injectable } from '@angular/core';

import { WpxApi, WpxService } from '@weplanx/ngx';

@Injectable()
export class WpxSchemaService {
  api!: WpxApi;

  constructor(private wpx: WpxService) {
    this.api = wpx.createApi('schema');
  }
}
