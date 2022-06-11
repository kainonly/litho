import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzIconService } from 'ng-zorro-antd/icon';

import { CustomizeComponent } from './manual/customize.component';
import { ExampleComponent } from './pages/example/example.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService) {}

  ngOnInit(): void {
    this.wpx.setAssets(environment.cdn);
    this.wpx.setComponent('customize', '自制', CustomizeComponent);
    this.wpx.setScope('example', '接入示例页', ExampleComponent);
    this.nzIconService.changeAssetsSource(environment.cdn);
  }
}
