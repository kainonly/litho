import { Injectable } from '@angular/core';

import { BitService, Crud } from 'ngx-bit';

@Injectable()
export class ResourceService {
  crud!: Crud;

  constructor(private bit: BitService) {
    this.crud = bit.api('resource');
  }
}
