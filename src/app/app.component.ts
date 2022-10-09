import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private nzIconService: NzIconService, public wpx: WpxService) {}

  ngOnInit(): void {
    this.nzIconService.changeAssetsSource(environment.cdn);
    this.wpx.setAssets(environment.cdn);
  }
}
