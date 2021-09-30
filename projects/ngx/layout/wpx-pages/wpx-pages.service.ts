import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WpxApi, WpxService } from '@weplanx/ngx';

import { WpxPageNode } from '../types';

@Injectable()
export class WpxPagesService {
  page: BehaviorSubject<WpxPageNode> = new BehaviorSubject<WpxPageNode>(<WpxPageNode>{});
  api!: WpxApi;

  constructor(private wpx: WpxService) {}

  dynamic(page: WpxPageNode): void {
    this.api = this.wpx.createApi(page.router.schema);
    this.page.next(page);
  }
}
