import { Injectable } from '@angular/core';

import { Api, BitService } from 'ngx-bit';

@Injectable()
export class LogsService {
  api: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('logs');
  }
}
