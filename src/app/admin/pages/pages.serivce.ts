import { Injectable } from '@angular/core';

import { Api, WpxService } from '@weplanx/components';

@Injectable()
export class PagesSerivce {
  api!: Api;

  constructor(private wpx: WpxService) {
    this.api = wpx.api('pages');
  }
}
