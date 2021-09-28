import { Injectable } from '@angular/core';

import { BitService, Api } from 'ngx-bit';

@Injectable()
export class PageService {
  api!: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('/page');
  }
}
