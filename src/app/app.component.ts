import { Component, OnInit } from '@angular/core';

import packer from '@common/app.language';
import { environment } from '@env';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService, private nzIconService: NzIconService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.nzIconService.changeAssetsSource(environment.iconUrl);
  }
}
