import { Injectable } from '@angular/core';

import { BitService, Api } from 'ngx-bit';

@Injectable()
export class ResourceService {
  crud!: Api;

  constructor(private bit: BitService) {
    this.crud = bit.api('/resource');
  }
}
