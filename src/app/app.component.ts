import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { Dataset, WpxService } from '@weplanx/components';
import { NzIconService } from 'ng-zorro-antd/icon';

import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  coll!: Dataset<any>;

  constructor(private wpx: WpxService, private nzIconService: NzIconService, private test: TestService) {}

  ngOnInit() {
    this.wpx.setAssets(environment.cdn);
    this.nzIconService.changeAssetsSource(environment.cdn);
    this.test.findOneById('61c0833dd1bba158d20fd8f4').subscribe(data => {
      console.log(data);
    });
    // this.test.replace('sd', {
    //   kind: 'group'
    // });
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
