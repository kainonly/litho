import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { environment } from '@env';
import { WpxService } from '@weplanx/ng';
import { WpxStoreService } from '@weplanx/ng/store';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private nzIconService: NzIconService, private wpx: WpxService, private store: WpxStoreService) {}

  ngOnInit(): void {
    this.nzIconService.changeAssetsSource(environment.cdn);
    this.wpx.setAssets(environment.cdn);
  }
}
