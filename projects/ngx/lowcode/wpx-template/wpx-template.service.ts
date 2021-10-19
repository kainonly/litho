import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WpxApi, WpxService } from '@weplanx/ngx';
import { WpxLayoutService } from '@weplanx/ngx/layout';

@Injectable()
export class WpxTemplateService {
  // page: BehaviorSubject<WpxPageNode> = new BehaviorSubject<WpxPageNode>(<WpxPageNode>{});
  // api!: WpxApi;

  constructor(private wpx: WpxService, private wpxLayout: WpxLayoutService) {}

  // dynamic(page: WpxPageNode): void {
  //   this.api = this.wpx.createApi(page.router.schema);
  //   this.wpxLayout.pages.subscribe(data => {
  //     console.log(data);
  //   });
  //   this.page.next(page);
  // }
}
