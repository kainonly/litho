import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzIconService } from 'ng-zorro-antd/icon';

import { CustomizeComponent } from './manual/customize.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService) {}

  ngOnInit(): void {
    this.wpx.setAssets(environment.cdn);
    this.wpx.setComponent('customize', CustomizeComponent);
    this.nzIconService.changeAssetsSource(environment.cdn);
  }
}
