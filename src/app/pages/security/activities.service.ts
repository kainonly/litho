import { Injectable } from '@angular/core';
import { Api, BitService } from 'ngx-bit';

@Injectable()
export class ActivitiesService {
  api: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('activities');
  }
}
