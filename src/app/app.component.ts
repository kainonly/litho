import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(
    private app: AppService,
    private wpx: WpxService,
    private icon: NzIconService
  ) {}

  ngOnInit(): void {
    this.icon.changeAssetsSource(environment.cdn);
    this.wpx.setAssets(environment.cdn);
    this.app.getUploadOption().subscribe(v => {
      this.wpx.setUpload(v);
    });
  }
}
