import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/common';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService) {}

  ngOnInit() {
    this.wpx.setAssets(environment.cdn);
    this.nzIconService.changeAssetsSource(environment.cdn);
  }
}
