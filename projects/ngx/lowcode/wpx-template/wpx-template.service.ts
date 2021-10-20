import { Injectable } from '@angular/core';

import { WpxApi, WpxService } from '@weplanx/ngx';

@Injectable()
export class WpxTemplateService {
  api!: WpxApi;

  constructor(private wpx: WpxService) {}

  setModel(name: string): void {
    this.api = this.wpx.createApi(name);
  }
}
