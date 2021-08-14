import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { NzIconService } from 'ng-zorro-antd/icon';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(private bit: BitService, private nzIconService: NzIconService) {}

  ngOnInit() {
    this.nzIconService.changeAssetsSource(environment.iconUrl);
  }
}
