import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzIconService } from 'ng-zorro-antd/icon';

import { CustomizeComponent } from './manual/customize.component';
import { WriteOffComponent } from './pages/write-off/write-off.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService) {}

  ngOnInit(): void {
    this.wpx.setAssets(environment.cdn);
    this.wpx.setComponent('customize', '自制', CustomizeComponent);
    this.wpx.setScope('write-off', '核销页', WriteOffComponent);
    this.nzIconService.changeAssetsSource(environment.cdn);
  }
}
