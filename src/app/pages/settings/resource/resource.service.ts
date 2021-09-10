import { Injectable } from '@angular/core';

import { BitService, Api } from 'ngx-bit';

@Injectable()
export class ResourceService {
  api!: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('/resource');
  }
}
