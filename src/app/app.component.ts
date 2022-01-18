import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { UploadStorage, WpxService } from '@weplanx/common';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService) {}

  ngOnInit(): void {
    this.wpx.setAssets(environment.cdn);
    this.wpx.setUpload({
      url: environment.upload.url,
      storage: environment.upload.storage as UploadStorage,
      fetchSignedMethod: 'GET',
      fetchSigned: environment.upload.fetchSigned,
      size: environment.upload.size
    });
    this.nzIconService.changeAssetsSource(environment.cdn);
  }
}
