import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from '@env';
import { Collection, WpxService } from '@weplanx/components';
import { NzIconService } from 'ng-zorro-antd/icon';

import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  coll!: Collection<any>;

  constructor(private wpx: WpxService, private nzIconService: NzIconService, private test: TestService) {}

  ngOnInit() {
    this.wpx.setBaseUrl(environment.baseUrl);
    this.wpx.setAssets(environment.cdn);
    this.nzIconService.changeAssetsSource(environment.cdn);
    // this.test
    //   .find({
    //     kind: 'group'
    //   })
    //   .subscribe(data => {
    //     console.log(data[0]);
    //   });
    // this.coll = this.wpx.collection('tests', []);
    // this.coll.from(this.test.api, true).subscribe(data => {
    //   console.log(data);
    // });
    // this.coll.ready.subscribe(() => {
    //   console.log(this.coll);
    // });
  }
}
